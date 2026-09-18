import { TestBed } from '@angular/core/testing';

import { WsTemplateIndexService } from './ws-template-index.service';

describe('WsTemplateIndexService', () => {
  let service: WsTemplateIndexService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WsTemplateIndexService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
