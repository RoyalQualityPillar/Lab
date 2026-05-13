import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { MatSelectChange } from '@angular/material/select';
import { ButtonLabelService } from 'src/app/service/button-label.service';
import { ApiService } from 'src/app/service/api-service/api.service';
import { apiEndPoints } from 'src/app/service/api-service/api-endpoints.constant';
import { CookieService } from 'ngx-cookie-service';
import { MessageDialogComponent } from 'src/app/common/message-dialog/message-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MessageService } from 'src/app/service/message.service';

@Component({
    selector: 'app-test-registration-initiator',
    templateUrl: './test-registration-initiator.component.html',
    styleUrls: ['./test-registration-initiator.component.scss'],
    standalone: false
})
export class TestRegistrationInitiatorComponent
  implements OnInit, AfterViewInit
{
  noOfVariable: any;
  noOfReading:any;
  noOfVariableQuantitiave: any;
  resultSection: any = {};
  q1resultSection: any;
  productInformation: FormGroup;
  pageData: any;
  headerData: any;
  selectedTabIndex: number = 0;
  selectedTestType: string = '';
  variableDataArray: any = [];
  readingDataArray: any = [];
  isLoading: boolean = false;
  constructor(
    public fb: FormBuilder,
    // private wsrService: WsrService,
    public buttonLabelService: ButtonLabelService,
    public apiService: ApiService,
    private cookieService: CookieService,
    public dialog: MatDialog,
    private messageService: MessageService,
  ) {
    this.productInformation = this.fb.group({
      ff0001: [''],
      ff0002: [''],
      ff0003: [''],
      ff0004: [''],
      ff0005: [''],
      ff0006: [''],
      ff0007: [''],
      ff0008: [''],
      ff0009: [''],
    });
  }
  ngAfterViewInit(): void {}
  ngOnInit() {
    this.pageData = {
      pageName: 'homePage',
      pageType: 'create',
      isRasiInit: 'TR-Initiator',
    };
  }
  public getHeaderData(event: any) {
    //return (this.headerData = this.wsrService.getHeaderData(event));
    this.headerData = event;
    console.log(event);
  }
  selectedTypeTitle: any;
  onChangeTestType(event: MatSelectChange) {
    this.selectedTestType = event.value;
    if (this.selectedTestType == 'QV') {
      this.selectedTypeTitle = 'Quantitative';
    } else if (this.selectedTestType == 'Q2V') {
      this.selectedTypeTitle = 'Quantitative 2';
    } else if (this.selectedTestType == 'statistical_1') {
      this.selectedTypeTitle = 'Statistical 1';
    } else if (this.selectedTestType == 'statistical_2') {
      this.selectedTypeTitle = 'Statistical 2';
    } else if (this.selectedTestType == 'multi_quantitiave') {
      this.selectedTypeTitle = 'Multi Quantitative';
    } else if (this.selectedTestType == 'multi_quantitiave_formulae') {
      this.selectedTypeTitle = 'Multi Quantitative Formulae';
    }
    if (this.selectedTestType) {
      this.selectedTabIndex = 2;
    }
  }
  tabChanged(event: MatTabChangeEvent) {
    // Custom logic for tab change if needed
  }
  updateVariableDataArray() {
    this.variableDataArray = Array(this.noOfVariable)
      .fill({})
      .map(() => ({ variable: '', symbol: '', uom: '' }));
  }
  formulaError: string | null = null;

  oldvalidateFormula() {
    const formula = this.resultSection.formula;

    // Regular expression to match valid formulas like V1, V2, etc., with operators (+, -, *, /)
    // const validFormulaRegex = /^V\d+(\s*[\+\-\*\/]\s*V\d+)*$/;
    const validFormulaRegex = /^[Vv]\d+(\s*[\+\-\*\/]\s*[Vv]\d+)*$/;

    if (!formula || formula.trim() === '') {
      console.log('3');
      this.formulaError = 'Formula cannot be empty.';
    } else if (!validFormulaRegex.test(formula)) {
      console.log('1');
      this.formulaError =
        'Invalid formula format. V1, V2, etc., and operators +, -, *, /.';
    } else {
      console.log('2');
      this.formulaError = null;
      this.calculateResult();
    }
  }
  oldcalculateResult() {
    // Skip calculation if formula has errors
    if (this.formulaError) {
      this.resultSection.result = 'Invalid Formula'; // Optional: clear or set a message
      return;
    }

    if (this.resultSection.formula) {
      try {
        let formula = this.resultSection.formula.trim();
        // Use 'gi' to match variables case-insensitively
        const variableMatches = formula.match(/v\d+/gi); // Matches v1, v2, etc.

        if (variableMatches) {
          variableMatches.forEach((variable) => {
            const index = parseInt(variable.replace(/v/i, ''), 10) - 1; // Using /v/i to replace 'v' with ''

            // Check if the variable index is within the bounds of variableDataArray
            if (
              this.variableDataArray[index] &&
              this.variableDataArray[index].observation
            ) {
              // Replace with value, case insensitive
              formula = formula.replace(
                new RegExp(variable, 'gi'),
                this.variableDataArray[index].observation
              );
            } else {
              formula = formula.replace(new RegExp(variable, 'gi'), '0'); // Replace missing variable with 0
            }
          });

          // Evaluate the formula safely
          this.resultSection.result = eval(formula);
        } else {
          this.resultSection.result = 0; // If no variables found, default to 0
        }
      } catch (error) {
        console.error('Error calculating result: ', error);
        this.resultSection.result = 'Error'; // Display an error message
      }
    } else {
      this.resultSection.result = 0; // If the formula is empty, default to 0
    }
  }
  old2validateFormula() {
    const formula = this.resultSection.formula;
  
    // Strict regex to allow only valid variables (v1, v2, etc.) or numbers with operators (+, -, *, /)
    const validFormulaRegex = /^([Vv]\d+|\d+)(\s*[\+\-\*\/]\s*([Vv]\d+|\d+))*$/;
  
    if (!formula || formula.trim() === '') {
      this.formulaError = 'Formula cannot be empty.';
    } else if (!validFormulaRegex.test(formula)) {
      this.formulaError = 'Invalid formula format. Use variables (V1, V2, etc.), numbers, and operators (+, -, *, /) only.';
    } else {
      this.formulaError = null;
      this.calculateResult();
    }
  }
  
  old2calculateResult() {
    if (this.formulaError) {
      this.resultSection.result = 'Invalid Formula';
      return;
    }
  
    if (this.resultSection.formula) {
      try {
        let formula = this.resultSection.formula.trim();
        const variableMatches = formula.match(/v\d+/gi); // Match variables like V1, V2, etc.
  
        if (variableMatches) {
          variableMatches.forEach((variable) => {
            const index = parseInt(variable.replace(/v/i, ''), 10) - 1;
  
            if (
              this.variableDataArray[index] &&
              this.variableDataArray[index].observation
            ) {
              formula = formula.replace(
                new RegExp(variable, 'gi'),
                this.variableDataArray[index].observation
              );
            } else {
              formula = formula.replace(new RegExp(variable, 'gi'), '0'); // Replace missing variable with 0
            }
          });
        }
  
        // Safely evaluate the formula
        this.resultSection.result = eval(formula);
      } catch (error) {
        console.error('Error calculating result: ', error);
        this.resultSection.result = 'Error';
      }
    } else {
      this.resultSection.result = 0; // Default to 0 if the formula is empty
    }
  }
  validateFormula() {
    const formula = this.resultSection.formula;
  
    // Updated regex to allow variables (V1, V2, etc.), numbers, operators, and properly nested brackets
    const validFormulaRegex = /^[\dVv\(\)\+\-\*\/\s]+$/;
  
    // Function to check if brackets are balanced
    const areBracketsBalanced = (input: string): boolean => {
      const stack = [];
      for (const char of input) {
        if (char === '(') {
          stack.push(char);
        } else if (char === ')') {
          if (stack.length === 0) return false; // Unmatched closing bracket
          stack.pop();
        }
      }
      return stack.length === 0; // Ensure no unmatched opening brackets
    };
  
    if (!formula || formula.trim() === '') {
      this.formulaError = 'Formula cannot be empty.';
    } else if (!validFormulaRegex.test(formula)) {
      this.formulaError =
        'Invalid formula format. Use variables (V1, V2, etc.), numbers, operators (+, -, *, /), and brackets.';
    } else if (!areBracketsBalanced(formula)) {
      this.formulaError = 'Invalid formula format. Ensure brackets are balanced.';
    } else {
      this.formulaError = null; // Clear any previous errors
      this.calculateResult();
    }
  }
  
  
  
  calculateResult() {
    if (this.formulaError) {
      this.resultSection.result = 'Invalid Formula';
      return;
    }
  
    if (this.resultSection.formula) {
      try {
        let formula = this.resultSection.formula.trim();
        const variableMatches = formula.match(/v\d+/gi); // Match variables like V1, V2, etc.
  
        if (variableMatches) {
          variableMatches.forEach((variable) => {
            const index = parseInt(variable.replace(/v/i, ''), 10) - 1;
  
            if (
              this.variableDataArray[index] &&
              this.variableDataArray[index].observation
            ) {
              formula = formula.replace(
                new RegExp(variable, 'gi'),
                this.variableDataArray[index].observation
              );
            } else {
              formula = formula.replace(new RegExp(variable, 'gi'), '0'); // Replace missing variable with 0
            }
          });
        }
  
        // Safely evaluate the formula
        this.resultSection.result = eval(formula);
      } catch (error) {
        console.error('Error calculating result: ', error);
        this.resultSection.result = 'Error';
      }
    } else {
      this.resultSection.result = 0; // Default to 0 if the formula is empty
    }
  }
  
  
  

  calculateResult1() {
    if (this.formulaError) {
      return; // Skip calculation if formula has errors
    }

    if (this.resultSection.formula) {
      try {
        let formula = this.resultSection.formula;
        const variableMatches = formula.match(/V\d+/g);

        if (variableMatches) {
          variableMatches.forEach((variable) => {
            const index = parseInt(variable.replace('V', ''), 10) - 1;

            if (
              this.variableDataArray[index] &&
              this.variableDataArray[index].observation
            ) {
              formula = formula.replace(
                variable,
                this.variableDataArray[index].observation
              );
            } else {
              formula = formula.replace(variable, '0');
            }
          });

          this.resultSection.result = eval(formula);
        }
      } catch (error) {
        console.error('Error calculating result: ', error);
        this.resultSection.result = 'Error';
      }
    }
  }
  q1variableDataArray: any;
  q1UpdateVariableDataArray() {
    this.q1variableDataArray = Array(this.noOfVariableQuantitiave)
      .fill({})
      .map(() => ({ variable: '', symbol: '', uom: '' }));
  }
  q1formulaError: string | null = null;
  q1validateFormula() {
    const formula = this.specialResultSection.specialformula;

    // Regular expression to match valid formulas like V1, V2, etc., with operators (+, -, *, /)
    // const validFormulaRegex = /^V\d+(\s*[\+\-\*\/]\s*V\d+)*$/;
    const validFormulaRegex = /^[Xx]\d+(\s*[\+\-\*\/]\s*[Xx]\d+)*$/;

    if (!formula || formula.trim() === '') {
      console.log('3');
      this.formulaError = 'Formula cannot be empty.';
    } else if (!validFormulaRegex.test(formula)) {
      console.log('1');
      this.formulaError =
        'Invalid formula format. V1, V2, etc., and operators +, -, *, /.';
    } else {
      console.log('2');
      this.formulaError = null;
      console.log(formula)
      this.q12calculateResult();
    }
  }
  q12calculateResult() {
    // Skip calculation if formula has errors
    if (this.specialformulaError) {
      this.specialResultSection.result = 'Invalid Formula'; // Optional: clear or set a message
      return;
    }
     console.log(this.specialResultSection.specialformula)
    if (this.specialResultSection.specialformula) {
      try {
        let formula = this.specialResultSection.specialformula.trim();
        // Use 'gi' to match variables case-insensitively
        const variableMatches = formula.match(/x\d+/gi); // Matches v1, v2, etc.
          console.log(variableMatches)
        if (variableMatches) {
          variableMatches.forEach((variable) => {
            const index = parseInt(variable.replace(/x/i, ''), 10) - 1; // Using /v/i to replace 'v' with ''

            // Check if the variable index is within the bounds of variableDataArray
            if (
              this.specialVariableDataArray[index] &&
              this.specialVariableDataArray[index].result
            ) {
              // Replace with value, case insensitive
              console.log(formula)
              formula = formula.replace(
                new RegExp(variable, 'gi'),
                this.specialVariableDataArray[index].result
              );
            } else {
              console.log(formula)
              formula = formula.replace(new RegExp(variable, 'gi'), '0'); // Replace missing variable with 0
            }
          });

          // Evaluate the formula safely
          this.specialResultSection.result = eval(formula);
        } else {
          this.specialResultSection.result = 0; // If no variables found, default to 0
        }
      } catch (error) {
        console.error('Error calculating result: ', error);
        this.specialResultSection.result = 'Error'; // Display an error message
      }
    } else {
      this.specialResultSection.result = 0; // If the formula is empty, default to 0
    }
  }

  noOfSpecialVariable: any;
  specialVariableDataArray: any;

  // UpdateSpecialVariableDataArray(){
  //   this.specialVariableDataArray = Array(this.noOfSpecialVariable).fill({}).map(() => ({ variable: '', symbol: '', uom: '' }));
  // }
  updateSpecialVariableDataArray() {
    this.specialVariableDataArray = [];

    // Create rows based on the value of noOfSpecialVariable
    for (let i = 0; i < this.noOfSpecialVariable; i++) {
      this.specialVariableDataArray.push({
        variable: '',
        functionType: '',
        observation: '',
        expression: '',
        uom: '',
        result: '',
        noOfDecimal: '',
        lowerlimit: '',
        upperlimit: '',
        displayInCOA: '',
      });
    }
  }

  selectedFunction: any;
  q1calculateRowResult(variableData, rowIndex) {
    console.log('Expression before splitting:', variableData.expression);

    if (!variableData.expression) {
      console.error('Expression is empty');
      variableData.result = '';
      return;
    }

    // Split the expression (like "v1, v2") and trim whitespaces
    const expressions = variableData.expression
      .split(',')
      .map((exp) => exp.trim());

    console.log('Expressions after splitting:', expressions);

    // Validate and filter expressions that match "v<number>" format
    const validExpressions = expressions.filter((exp) => /^v\d+$/.test(exp));

    if (validExpressions.length === 0) {
      console.error('No valid expressions found');
      variableData.result = '';
      return;
    }

    console.log('Valid expressions for row:', validExpressions);

    // Extract observation values based on valid expressions
    const observationValues = validExpressions
      .map((exp) => {
        const index = parseInt(exp.replace('v', '')) - 1; // Convert "v1" to index 0, "v2" to index 1, etc.
        if (index >= 0 && index < this.q1variableDataArray.length) {
          return parseFloat(this.q1variableDataArray[index].observation);
        }
        return null; // Return null for invalid indices
      })
      .filter((v) => !isNaN(v)); // Filter out any invalid numbers

    console.log('Observation values:', observationValues);

    // Calculate result based on the function type
    if (observationValues.length > 0) {
      switch (variableData.functionType) {
        case 'min':
          variableData.result = Math.min(...observationValues).toFixed(
            variableData.noOfDecimal || 2
          );
          break;
        case 'max':
          variableData.result = Math.max(...observationValues).toFixed(
            variableData.noOfDecimal || 2
          );
          break;
        case 'avg':
          const sum = observationValues.reduce((a, b) => a + b, 0);
          variableData.result = (sum / observationValues.length).toFixed(
            variableData.noOfDecimal || 2
          );
          break;
        default:
          variableData.result = '';
      }
    } else {
      variableData.result = '';
    }

    console.log(
      'Calculated result for row index:',
      rowIndex,
      ' Result:',
      variableData.result
    );

    // Update result in specialVariableDataArray for this specific row based on index
    if (this.specialVariableDataArray[rowIndex]) {
      this.specialVariableDataArray[rowIndex].result = variableData.result;
      console.log(
        'Updated specialVariableDataArray result for row index:',
        rowIndex,
        ':',
        this.specialVariableDataArray[rowIndex].result
      );
    }
  }

  onSpecialVariableChange(newValue) {
    this.noOfSpecialVariable = newValue;
    this.updateSpecialVariableDataArray();
  }

  onSaveConfirmation(value) {}
  // onSubmit(value) {
  //   let HttpMethod = 'POST';
  //   let params = {};
  //   let body = {
  //     lcRequest: {
  //       unitCode: this.headerData.unitcode,
  //       moduleCode: this.headerData.modulecode,
  //       departmentCode: this.headerData.departmentcode,
  //       lcrqNumber: this.headerData.requestNo,
  //       lcNumber: this.headerData.lcnum,
  //       lcStage: this.headerData.stage,
  //       stage2: 0,
  //       draft: true,
  //       comments: '',
  //       documentModule: '',
  //       createdBy: this.cookieService.get('userId'),
  //       lcRole: this.headerData.role,
  //     },
  //     ttIndexDtoList: [
  //       {
  //         uc0001: "", //blank for initiator
  //         ff0001: this.selectedTestType,
  //         ff0002: this.productInformation.controls['ff0002'].value,
  //         ff0003: this.productInformation.controls['ff0003'].value,
  //         ff0004: this.productInformation.controls['ff0004'].value,
  //         ff0005: this.productInformation.controls['ff0005'].value,
  //         ff0006: this.productInformation.controls['ff0006'].value,
  //         ff0007: this.productInformation.controls['ff0007'].value,
  //         ff0008: this.productInformation.controls['ff0008'].value,
  //         ff0009: this.productInformation.controls['ff0009'].value,
  //       },
  //     ],
  //     teVariableDtoList: [], //only for QV
  //     tsResultsDtoList: [   //only for QV
  //       {
  //         ff0001: this.resultSection.formula,
  //         ff0002: this.resultSection.result,
  //         ff0003: this.resultSection.uom,
  //         ff0004: this.resultSection.noOfDecimal,
  //         ff0005: this.resultSection.lowerOperator,
  //         ff0006: this.resultSection.lowerValue,
  //         ff0007: this.resultSection.higherOperator,
  //         ff0008: this.resultSection.higher,
  //         ff0009: this.resultSection.comments,
  //       },
  //     ],
  //     // tsVariableQuDtoList: [
  //     //   {
  //     //     uc0001: 'string',
  //     //     ff0001: 'string',
  //     //     ff0002: 'string',
  //     //     ff0003: 'string',
  //     //     ff0004: 'string',
  //     //     ff0005: 'string',
  //     //     ff0006: 'string',
  //     //     ff0007: 'string',
  //     //     ff0009: 'string',
  //     //     ff0010: 'string',
  //     //     ff0011: 'string',
  //     //     ff0012: 'string',
  //     //     createdby: 'string',
  //     //     status: 0,
  //     //     comments: 'string',
  //     //     unitcode: 'string',
  //     //   },
  //     // ],
  //     // tsResultsQuDtoList: [
  //     //   {
  //     //     uc0001: 'string',
  //     //     ff0001: 'string',
  //     //     ff0002: 'string',
  //     //     ff0003: 'string',
  //     //     ff0004: 'string',
  //     //     ff0005: 'string',
  //     //     ff0006: 'string',
  //     //     ff0007: 'string',
  //     //     ff0009: 'string',
  //     //     ff0010: 'string',
  //     //     ff0011: 'string',
  //     //     ff0012: 'string',
  //     //     ff0013: 'string',
  //     //     ff0014: 'string',
  //     //     ff0015: 'string',
  //     //     ff0016: 'string',
  //     //     ff0017: 'string',
  //     //     createdby: 'string',
  //     //     status: 0,
  //     //     comments: 'string',
  //     //     unitcode: 'string',
  //     //   },
  //     // ],
  //     // tsSpcVariableQuDtoList: [
  //     //   {
  //     //     uc0001: 'string',
  //     //     ff0001: 'string',
  //     //     ff0002: 'string',
  //     //     ff0003: 'string',
  //     //     ff0004: 'string',
  //     //     ff0005: 'string',
  //     //     ff0006: 'string',
  //     //     ff0007: 'string',
  //     //     ff0009: 'string',
  //     //     ff0010: 'string',
  //     //     ff0011: 'string',
  //     //     ff0012: 'string',
  //     //     ff0013: 'string',
  //     //     ff0014: 'string',
  //     //     ff0015: 'string',
  //     //     ff0016: 'string',
  //     //     ff0017: 'string',
  //     //     createdby: 'string',
  //     //     status: 0,
  //     //     comments: 'string',
  //     //     unitcode: 'string',
  //     //   },
  //     // ],
  //     // tsResults2QuDTODtoList: [
  //     //   {
  //     //     uc0001: 'string',
  //     //     ff0001: 'string',
  //     //     ff0002: 'string',
  //     //     ff0003: 'string',
  //     //     ff0004: 'string',
  //     //     ff0005: 'string',
  //     //     ff0006: 'string',
  //     //     ff0007: 'string',
  //     //     ff0008: 'string',
  //     //     ff0009: 'string',
  //     //     ff0010: 'string',
  //     //     ff0011: 'string',
  //     //     ff0012: 'string',
  //     //     ff0013: 'string',
  //     //     ff0014: 'string',
  //     //     ff0015: 'string',
  //     //     ff0016: 'string',
  //     //     ff0017: 'string',
  //     //     createdby: 'string',
  //     //     status: 0,
  //     //     comments: 'string',
  //     //     lc0001: 'string',
  //     //     lc0002: 'string',
  //     //     lc0003: 'string',
  //     //     lc0004: 'string',
  //     //     lc0005: 'string',
  //     //     lc0006: 'string',
  //     //     unitcode: 'string',
  //     //   },
  //     // ],
  //     // tsVariable2QuDtoList: [
  //     //   {
  //     //     uc0001: 'string',
  //     //     ff0001: 'string',
  //     //     ff0002: 'string',
  //     //     ff0003: 'string',
  //     //     ff0004: 'string',
  //     //     ff0005: 'string',
  //     //     ff0006: 'string',
  //     //     ff0007: 'string',
  //     //     createdby: 'string',
  //     //     status: 0,
  //     //     comments: 'string',
  //     //     lc0001: 'string',
  //     //     lc0002: 'string',
  //     //     lc0003: 'string',
  //     //     lc0004: 'string',
  //     //     lc0005: 'string',
  //     //     lc0006: 'string',
  //     //     unitcode: 'string',
  //     //   },
  //     // ],
  //   };
  //   if(this.selectedTestType == 'QV'){
  //   const renamedData = this.variableDataArray.map((item) => ({
  //     ff0001: item.variable,
  //     ff0002: item.symbol,
  //     ff0003: item.uom,
  //     ff0004: item.observation,
  //   }));
  //   body.teVariableDtoList = renamedData;
  // }

  //   this.isLoading = true;
  //   console.log(body);
  //   this.apiService
  //     .sendRequest(apiEndPoints.trRequestSaveUpdate, HttpMethod, params, body)
  //     .subscribe((data: any) => {
  //       this.isLoading = false;
  //     });
  // }
  //detail part for q1
  specialformulaError: any;
  specialResultSection: any = {};
  spreicalValidateFormula() {}
 // Variables to store calculated values
 minValue: number | null = null;
 maxValue: number | null = null;
 averageValue: number | null = null;
 standardDeviation: number | null = null;
 relativeStandardDeviation: number | null = null;
 // Validate formula and calculate statistics
 validateStatistical() {
  const observations = this.readingDataArray
    .map((data) => parseFloat(data.observation))
    .filter((value) => !isNaN(value)); // Filter valid numeric values

  if (observations.length > 0) {
    this.calculateStatistics(observations);
  } else {
    // Reset values if there are no valid observations
    this.minValue = null;
    this.maxValue = null;
    this.averageValue = null;
    this.standardDeviation = null;
    this.relativeStandardDeviation = null;
  }
}

// Function to calculate statistics
calculateStatistics(observations: number[]) {
  // Calculate min, max, average
  this.minValue = Math.min(...observations);
  this.maxValue = Math.max(...observations);
  this.averageValue = observations.reduce((sum, obs) => sum + obs, 0) / observations.length;

  // Calculate standard deviation
  const variance =
    observations.reduce((sum, obs) => sum + Math.pow(obs - this.averageValue!, 2), 0) /
    observations.length;
  this.standardDeviation = Math.sqrt(variance);

  // Calculate relative standard deviation (RSD)
  this.relativeStandardDeviation = (this.standardDeviation / this.averageValue!) * 100;
}

  updateReadingDataArray() {
    this.readingDataArray = Array(this.noOfReading)
      .fill({})
      .map(() => ({ variable: '', uom: '' }));
  }
  givenMinValue: number | null = null;
  minValueResult:string = '';
  minValueCalculationLimit(){
    console.log(this.givenMinValue)
    console.log(this.minValue)
    if(this.minValue >= this.givenMinValue){
      this.minValueResult ="Pass"
    }else{
      this.minValueResult ="Fail"
    }
  }
  givenMaxValue: number | null = null;
  maxValueResult:string = '';
  maxValueCalculationLimit(){
    console.log(this.givenMaxValue)
    console.log(this.maxValue)
    if(this.maxValue <= this.givenMaxValue){
      this.maxValueResult ="Pass"
    }else{
      this.maxValueResult ="Fail"
    }
  }
  higherAverageValue: number | null = null;
  lowerAverageValue: number | null = null;
  aveValueResult:string = '';
  averageCalculationLimit(){
    if(this.averageValue > this.lowerAverageValue && this.averageValue < this.higherAverageValue){
      this.aveValueResult ="Pass"
    }else{
      this.aveValueResult ="Fail"
    }

  }
  higherDevValue: number | null = null;
  devValueResult:string='';
  devCalculationLimit(){
   if(this.higherDevValue <= this.standardDeviation){
    this.devValueResult ="Pass"
    }else{
      this.devValueResult ="Fail"
   }
  }
  higherRelDevValue: number | null = null;
  reldevValueResult:string='';
  reldevCalculationLimit(){
    if(this.higherRelDevValue <= this.relativeStandardDeviation){
      this.reldevValueResult ="Pass"
      }else{
        this.reldevValueResult ="Fail"
     }
  }
  standardLimitValue:number| null = null;
  standardDevLimitValue:number| null = null;
  _7thlowerValue:number| null = null;
  _7thHigherValue:number| null = null;
  // onChangeStandardLimit() {
  //   console.log(this.readingDataArray)
  //   console.log("Before update:");
  //   console.log("standardLimitValue:", this.standardLimitValue);
  //   console.log("standardDevLimitValue:", this.standardDevLimitValue);
  
  //   if (this.standardLimitValue !== null && this.standardDevLimitValue !== null) {
  //     this._7thlowerValue = null;
  //     this._7thHigherValue = null;
  
  //     // New calculation approach using standardDevLimitValue
  //     const deviationValue = (this.standardDevLimitValue * this.averageValue) / 100;
  
  //     this._7thlowerValue = this.averageValue - deviationValue;
  //     this._7thHigherValue = this.averageValue + deviationValue;
  
  //     console.log("After update:");
  //     console.log("_7thlowerValue:", this._7thlowerValue);
  //     console.log("_7thHigherValue:", this._7thHigherValue);
  //   } else {
  //     console.log("Either standardLimitValue or standardDevLimitValue is null");
  //   }
  // }
  readingResult:any;
  onChangeStandardLimit() {
    console.log(this.readingDataArray);
    console.log("Before update:");
    console.log("standardLimitValue:", this.standardLimitValue);
    console.log("standardDevLimitValue:", this.standardDevLimitValue);

    if (this.standardLimitValue !== null && this.standardDevLimitValue !== null) {
        this._7thlowerValue = null;
        this._7thHigherValue = null;

        // Calculate deviation
        const deviationValue = (this.standardDevLimitValue * this.averageValue) / 100;

        // Define lower and higher bounds
        this._7thlowerValue = this.averageValue - deviationValue;
        this._7thHigherValue = this.averageValue + deviationValue;

        console.log("After update:");
        console.log("_7thlowerValue:", this._7thlowerValue);
        console.log("_7thHigherValue:", this._7thHigherValue);

        // **New Logic: Count observations within the range**
        let count = 0;
        this.readingDataArray.forEach((reading: { observation: string }) => {
            const observationValue = parseFloat(reading.observation);
            if (observationValue >= this._7thlowerValue && observationValue <= this._7thHigherValue) {
                count++;
            }
        });

        console.log("Number of observations within range:", count);

        // **Check Pass/Fail Condition**
        this.readingResult = count >= this.standardLimitValue ? "Pass" : "Fail";
        console.log("Result:", this.readingResult);
    } else {
        console.log("Either standardLimitValue or standardDevLimitValue is null");
    }
}
_7thstandardLimitValue:number| null = null;
  _7thstandardDevLimitValue:number| null = null;
  _8thlowerValue:number| null = null;
  _8thHigherValue:number| null = null;

  _7threadingResult:any;
  onChangethStandardLimit() {
    this._7thstandardLimitValue = 0;
    console.log(this.readingDataArray);
    console.log("Before update:");
    console.log("standardLimitValue:", this._7thstandardLimitValue);
    console.log("standardDevLimitValue:", this._7thstandardDevLimitValue);

    if (this._7thstandardLimitValue !== null && this._7thstandardDevLimitValue !== null) {
        this._8thlowerValue = null;
        this._8thHigherValue = null;

        // Calculate deviation
        const deviationValue = (this._7thstandardDevLimitValue * this.averageValue) / 100;

        // Define lower and higher bounds
        this._8thlowerValue = this.averageValue - deviationValue;
        this._8thHigherValue = this.averageValue + deviationValue;

        console.log("After update:");
        console.log("_7thlowerValue:", this._8thlowerValue);
        console.log("_7thHigherValue:", this._8thHigherValue);

        // **New Logic: Count observations within the range**
        let count = 0;
        this.readingDataArray.forEach((reading: { observation: string }) => {
            const observationValue = parseFloat(reading.observation);
            if (observationValue >= this._8thlowerValue && observationValue <= this._8thHigherValue) {
                count++;
            }
        });

        console.log("Number of observations within range:", count);

        // **Check Pass/Fail Condition**
        this.readingResult = count >= this._7thstandardLimitValue ? "Pass" : "Fail";
        console.log("Result:", this._7threadingResult);
    } else {
        console.log("Either standardLimitValue or standardDevLimitValue is null");
    }
}


  onChangeDevLimitValue(){

  }
  onSubmit(value) {
    let HttpMethod = 'POST';
    let params = {};
    let body = {
      lcRequest: {
        unitCode: this.headerData.unitcode,
        moduleCode: this.headerData.modulecode,
        departmentCode: this.headerData.departmentcode,
        lcrqNumber: this.headerData.requestNo,
        lcNumber: this.headerData.lcnum,
        lcStage: this.headerData.stage,
        stage2: 0,
        draft: true,
        comments: '',
        documentModule: '',
        createdBy: this.cookieService.get('userId'),
        lcRole: this.headerData.role,
      },
      ttIndexDtoList: [
        {
         // uc0001: "", // blank for initiator
          ff0001: this.selectedTestType,
          ff0002: this.productInformation.controls['ff0002'].value,
          ff0003: this.productInformation.controls['ff0003'].value,
          ff0004: this.productInformation.controls['ff0004'].value,
          ff0005: this.productInformation.controls['ff0005'].value,
          ff0006: this.productInformation.controls['ff0006'].value,
          ff0007: this.productInformation.controls['ff0007'].value,
          ff0008: this.productInformation.controls['ff0008'].value,
          ff0009: this.productInformation.controls['ff0009'].value,
        },
      ],
    };
  
    // Add elements to the body based on the selectedTestType
    switch (this.selectedTestType) {
      case 'QV':
        const teVariableData = this.variableDataArray.map((item) => ({
          ff0001: item.variable,
          ff0002: item.symbol,
          ff0003: item.uom,
          ff0004: item.observation,
        }));
        body['teVariableDtoList'] = teVariableData;
        body['tsResultsDtoList'] = [
          {
            ff0001: this.resultSection.formula,
            ff0002: this.resultSection.result,
            ff0003: this.resultSection.uom,
            ff0004: this.resultSection.noOfDecimal,
            ff0005: this.resultSection.lowerOperator,
            ff0006: this.resultSection.lowerValue,
            ff0007: this.resultSection.higherOperator,
            ff0008: this.resultSection.higher,
            ff0009: this.resultSection.comments,
          },
        ];
        break;
  
      case 'Q2V':
        body.ttIndexDtoList[0].ff0001 ='QSV'
        // const tsVariableQuData = this.variableDataArray.map((item) => ({
        //   uc0001: item.uc0001 || '', // Add additional mappings as needed
        //   ff0001: item.ff0001 || '',
        //   ff0002: item.ff0002 || '',
        //   ff0003: item.ff0003 || '',
        //   ff0004: item.ff0004 || '',
        //   createdBy: this.cookieService.get('userId'),
        //   status: 0,
        //   comments: item.comments || '',
        //   unitCode: item.unitCode || '',
        // }));
        // body['tsVariableQuDtoList'] = tsVariableQuData;
        const tsVariableQuDtoUIList= this.q1variableDataArray.map((item) => ({
          ff0001: item.variable,
          ff0002: item.symbol,
          ff0003: item.uom,
          ff0004: item.observation,
        }));
        body['tsVariableQuDtoList'] = tsVariableQuDtoUIList

        const specialVariableDataArray = this.specialVariableDataArray.map((item) => ({
         ff0004:item.variable,
         ff0005:item.symbol,
         ff0006:item.uom,
         ff0007:item.functionType,
         ff0008:item.expression,
         ff0009:item.noOfDecimal,
         ff0010:item.lowerlimit,
         ff0011:item.upperlimit,
         ff0013:item.result,
        }))
        body['tsSpcVariableQuDtoList'] = specialVariableDataArray
        body['tsResultsQuDtoList'] = [
          {
            ff0003: this.specialResultSection.specialformula, 
            ff0018: this.specialResultSection.result,
            ff0004: this.specialResultSection.uom,
            ff0005: this.specialResultSection.noOfDecimal,
            ff0006: this.specialResultSection.lowerOperator,
            ff0007: this.specialResultSection.lowerValue,
            ff0008: this.specialResultSection.higherOperator,
            ff0009: this.specialResultSection.higher,
            ff0010: this.specialResultSection.noOfLOD,
            ff0011: this.specialResultSection.noOfCOA,
            ff0012: this.specialResultSection.noOfLOQ,
            ff0013: this.specialResultSection.noOfTQCOA,
            ff0017: this.specialResultSection.comments,
          },
        ];
        break;
  
      // Add more cases for other `selectedTestType` values
      default:
        console.warn('Unhandled selectedTestType:', this.selectedTestType);
    }
  
    // Send the request
    this.isLoading = true;
    console.log(body);
    this.apiService
      .sendRequest(apiEndPoints.trRequestSaveUpdate, HttpMethod, params, body)
      .subscribe((data: any) => {
        this.isLoading = false;
          if (data.errorInfo != null) {
                  this.isLoading = false;
                  this.dialog.open(MessageDialogComponent, {
                    data: {
                      message: data.errorInfo,
                      heading: 'Error Information',
                    },
                  });
                }else {
                  this.isLoading = false;
                  this.messageService.sendSnackbar(
                    'success',data.status
                  );
      }
  })
}
  
}
