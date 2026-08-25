import { Injectable } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class ExcelHelperService {
  public productInformation = new FormGroup({
    productName: new FormControl(''),
    protocolNo: new FormControl(''),
    sampleDes: new FormControl(''),
    testParameter: new FormControl(''),
    standardnumber: new FormControl(''),
    standardname: new FormControl(''),
    analystName: new FormControl(''),
    batchNo: new FormControl(''),
    arNo: new FormControl(''),
    lowerLimit: new FormControl(''),
    upperLimit: new FormControl(''),
    assayType:new FormControl(''),
    result:new FormControl(''),
  });

  public aveargeCalculate = new FormGroup({
    averageContent: new FormControl(''),
    averageAnhydrous: new FormControl(''),
    averageAnhydrousAndSolvent: new FormControl(''),
  });

  public assayCalculationForm = new FormGroup({
    molecularWeightOne: new FormControl('1'),
    molecularWeightTwo: new FormControl('1'),
    standardAvgArea: new FormControl('1'),
    labelClaim: new FormControl('1'),
    standardPurity: new FormControl('1'),


  });

  public standardDilutionForm = new FormGroup({
    mgToOne: new FormControl('1'),
    mlOne: new FormControl('1'),
    mlToTwo: new FormControl('1'),
    mlTwo: new FormControl('1'),
    mlToThree: new FormControl('1'),
    mlThree: new FormControl('1'),
    mlToFour: new FormControl('1'),
    mlFour: new FormControl('1'),
    mlToFive: new FormControl('1'),
    mlFive: new FormControl('1'),
    mlToSix: new FormControl('1'),
    mlSix: new FormControl('1'),
  });

  public samplePreparation = new FormGroup({
    mlOne: new FormControl('1'),
    mlToOne: new FormControl('1'),
    mlTwo: new FormControl('1'),
    mlToTwo: new FormControl('1'),
    mlThree: new FormControl('1'),
    mlToThree: new FormControl('1'),
    mlFour: new FormControl('1'),
    mlToFour: new FormControl('1'),
    mlFive: new FormControl('1'),
    mlToFive: new FormControl('1'),
    mlSix: new FormControl('1'),
  });

  public roundUpValues = new FormGroup({
    dropdownContent: new FormControl(1),
    dropdownAnhydrous: new FormControl(1),
    dropdownSolvent: new FormControl(1),
  });

  public sampleInformation = new FormGroup({
    sampleInfo: new FormArray([this.fields()]),
  });

  public fields(): FormGroup {
    return this.fb.group({
      sampleDetails: new FormControl('1'),
      spiArea: new FormControl('1'),
      splWeight: new FormControl('1'),
      waterLod: new FormControl('1'),
      solvent: new FormControl('1'),
      basisContent: new FormControl(''),
      anhydrousBasis: new FormControl(''),
      ashydrousAndSolventFreeBasis: new FormControl(''),

    });
  }

  public numbers = [
    {
      number: 1,
    },
    {
      number: 2,
    },
    {
      number: 3,
    },
    {
      number: 4,
    },
    {
      number: 5,
    },
  ];

  constructor(
    private fb: FormBuilder,

  ) {
    
  }

  public cancel() {
    this.assayCalculationForm.setValue({
      molecularWeightOne: '1',
      molecularWeightTwo: '1',
      standardAvgArea: '1',
      labelClaim: '1',
      standardPurity: '1',
   
    });

    this.standardDilutionForm.setValue({
      mgToOne: '1',
      mlOne: '1',
      mlToTwo: '1',
      mlTwo: '1',
      mlToThree: '1',
      mlThree: '1',
      mlToFour: '1',
      mlFour: '1',
      mlToFive: '1',
      mlFive: '1',
      mlToSix: '1',
      mlSix: '1',
    });

    this.samplePreparation.setValue({
      mlOne: '1',
      mlToOne: '1',
      mlTwo: '1',
      mlToTwo: '1',
      mlThree: '1',
      mlToThree: '1',
      mlFour: '1',
      mlToFour: '1',
      mlFive: '1',
      mlToFive: '1',
      mlSix: '1',
    });

    const form = this.sampleInformation.controls;
    form.sampleInfo.controls.forEach((field) => {
      field.controls['sampleDetails'].patchValue('1');
      field.controls['spiArea'].patchValue('1');
      field.controls['splWeight'].patchValue('1');
      field.controls['waterLod'].patchValue('1');
      field.controls['solvent'].patchValue('1');

    });
  }
  

  
}
