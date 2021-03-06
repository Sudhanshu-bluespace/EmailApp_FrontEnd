/**
 * @fileoverview This file is generated by the Angular 2 template compiler.
 * Do not edit.
 * @suppress {suspiciousCode,uselessCode,missingProperties}
 */
 /* tslint:disable */

import * as import0 from '../../../../src/app/analytics/tab.component';
import * as import1 from '@angular/core/src/change_detection/change_detection_util';
import * as import2 from '@angular/core/src/linker/view';
import * as import3 from '@angular/core/src/linker/view_utils';
import * as import4 from '@angular/core/src/render/api';
import * as import5 from '@angular/core/src/metadata/view';
import * as import6 from '@angular/core/src/linker/view_type';
import * as import7 from '@angular/core/src/change_detection/constants';
import * as import8 from '@angular/core/src/linker/component_factory';
import * as import9 from 'ng2-google-charts/google-chart/google-chart.component';
import * as import10 from '../../../node_modules/ng2-google-charts/google-chart/google-chart.component.ngfactory';
import * as import11 from '@angular/core/src/linker/element_ref';
import * as import12 from 'ng2-google-charts/google-charts-loader.service';
export class Wrapper_Tab {
  /*private*/ _eventHandler:Function;
  context:import0.Tab;
  /*private*/ _changed:boolean;
  /*private*/ _expr_0:any;
  /*private*/ _expr_1:any;
  constructor() {
    this._changed = false;
    this.context = new import0.Tab();
    this._expr_0 = import1.UNINITIALIZED;
    this._expr_1 = import1.UNINITIALIZED;
  }
  ngOnDetach(view:import2.AppView<any>,componentView:import2.AppView<any>,el:any):void {
  }
  ngOnDestroy():void {
  }
  check_title(currValue:any,throwOnChange:boolean,forceUpdate:boolean):void {
    if ((forceUpdate || import3.checkBinding(throwOnChange,this._expr_0,currValue))) {
      this._changed = true;
      this.context.title = currValue;
      this._expr_0 = currValue;
    }
  }
  check_active(currValue:any,throwOnChange:boolean,forceUpdate:boolean):void {
    if ((forceUpdate || import3.checkBinding(throwOnChange,this._expr_1,currValue))) {
      this._changed = true;
      this.context.active = currValue;
      this._expr_1 = currValue;
    }
  }
  ngDoCheck(view:import2.AppView<any>,el:any,throwOnChange:boolean):boolean {
    var changed:any = this._changed;
    this._changed = false;
    return changed;
  }
  checkHost(view:import2.AppView<any>,componentView:import2.AppView<any>,el:any,throwOnChange:boolean):void {
  }
  handleEvent(eventName:string,$event:any):boolean {
    var result:boolean = true;
    return result;
  }
  subscribe(view:import2.AppView<any>,_eventHandler:any):void {
    this._eventHandler = _eventHandler;
  }
}
var renderType_Tab_Host:import4.RenderComponentType = import3.createRenderComponentType('',0,import5.ViewEncapsulation.None,([] as any[]),{});
class View_Tab_Host0 extends import2.AppView<any> {
  _el_0:any;
  compView_0:import2.AppView<import0.Tab>;
  _Tab_0_3:Wrapper_Tab;
  constructor(viewUtils:import3.ViewUtils,parentView:import2.AppView<any>,parentIndex:number,parentElement:any) {
    super(View_Tab_Host0,renderType_Tab_Host,import6.ViewType.HOST,viewUtils,parentView,parentIndex,parentElement,import7.ChangeDetectorStatus.CheckAlways);
  }
  createInternal(rootSelector:string):import8.ComponentRef<any> {
    this._el_0 = import3.selectOrCreateRenderHostElement(this.renderer,'tab',import3.EMPTY_INLINE_ARRAY,rootSelector,(null as any));
    this.compView_0 = new View_Tab0(this.viewUtils,this,0,this._el_0);
    this._Tab_0_3 = new Wrapper_Tab();
    this.compView_0.create(this._Tab_0_3.context);
    this.init(this._el_0,((<any>this.renderer).directRenderer? (null as any): [this._el_0]),(null as any));
    return new import8.ComponentRef_<any>(0,this,this._el_0,this._Tab_0_3.context);
  }
  injectorGetInternal(token:any,requestNodeIndex:number,notFoundResult:any):any {
    if (((token === import0.Tab) && (0 === requestNodeIndex))) { return this._Tab_0_3.context; }
    return notFoundResult;
  }
  detectChangesInternal(throwOnChange:boolean):void {
    this._Tab_0_3.ngDoCheck(this,this._el_0,throwOnChange);
    this.compView_0.internalDetectChanges(throwOnChange);
  }
  destroyInternal():void {
    this.compView_0.destroy();
  }
  visitRootNodesInternal(cb:any,ctx:any):void {
    cb(this._el_0,ctx);
  }
}
export const TabNgFactory:import8.ComponentFactory<import0.Tab> = new import8.ComponentFactory<import0.Tab>('tab',View_Tab_Host0,import0.Tab);
const styles_Tab:any[] = ['.pane[_ngcontent-%COMP%]{\n      padding: 2em;\n    }'];
var renderType_Tab:import4.RenderComponentType = import3.createRenderComponentType('',0,import5.ViewEncapsulation.Emulated,styles_Tab,{});
export class View_Tab0 extends import2.AppView<import0.Tab> {
  _text_0:any;
  _el_1:any;
  _text_2:any;
  _el_3:any;
  compView_3:import2.AppView<import9.GoogleChartComponent>;
  _GoogleChartComponent_3_3:import10.Wrapper_GoogleChartComponent;
  _text_4:any;
  _text_5:any;
  /*private*/ _expr_8:any;
  constructor(viewUtils:import3.ViewUtils,parentView:import2.AppView<any>,parentIndex:number,parentElement:any) {
    super(View_Tab0,renderType_Tab,import6.ViewType.COMPONENT,viewUtils,parentView,parentIndex,parentElement,import7.ChangeDetectorStatus.CheckAlways);
    this._expr_8 = import1.UNINITIALIZED;
  }
  createInternal(rootSelector:string):import8.ComponentRef<any> {
    const parentRenderNode:any = this.renderer.createViewRoot(this.parentElement);
    this._text_0 = this.renderer.createText(parentRenderNode,'\n    ',(null as any));
    this._el_1 = import3.createRenderElement(this.renderer,parentRenderNode,'div',new import3.InlineArray2(2,'class','pane'),(null as any));
    this._text_2 = this.renderer.createText(this._el_1,'\n		',(null as any));
    this._el_3 = import3.createRenderElement(this.renderer,this._el_1,'google-chart',import3.EMPTY_INLINE_ARRAY,(null as any));
    this.compView_3 = new import10.View_GoogleChartComponent0(this.viewUtils,this,3,this._el_3);
    this._GoogleChartComponent_3_3 = new import10.Wrapper_GoogleChartComponent(new import11.ElementRef(this._el_3),this.parentView.injectorGet(import12.GoogleChartsLoaderService,this.parentIndex));
    this.compView_3.create(this._GoogleChartComponent_3_3.context);
    this._text_4 = this.renderer.createText(this._el_1,'\n    ',(null as any));
    this._text_5 = this.renderer.createText(parentRenderNode,'\n  ',(null as any));
    this.init((null as any),((<any>this.renderer).directRenderer? (null as any): [
      this._text_0,
      this._el_1,
      this._text_2,
      this._el_3,
      this._text_4,
      this._text_5
    ]
    ),(null as any));
    return (null as any);
  }
  injectorGetInternal(token:any,requestNodeIndex:number,notFoundResult:any):any {
    if (((token === import9.GoogleChartComponent) && (3 === requestNodeIndex))) { return this._GoogleChartComponent_3_3.context; }
    return notFoundResult;
  }
  detectChangesInternal(throwOnChange:boolean):void {
    const currVal_3_0_0:any = this.context.pieChartOptions;
    this._GoogleChartComponent_3_3.check_data(currVal_3_0_0,throwOnChange,false);
    if (this._GoogleChartComponent_3_3.ngDoCheck(this,this._el_3,throwOnChange)) { this.compView_3.markAsCheckOnce(); }
    const currVal_8:boolean = !this.context.active;
    if (import3.checkBinding(throwOnChange,this._expr_8,currVal_8)) {
      this.renderer.setElementProperty(this._el_1,'hidden',currVal_8);
      this._expr_8 = currVal_8;
    }
    this.compView_3.internalDetectChanges(throwOnChange);
  }
  destroyInternal():void {
    this.compView_3.destroy();
    this._GoogleChartComponent_3_3.ngOnDestroy();
  }
}