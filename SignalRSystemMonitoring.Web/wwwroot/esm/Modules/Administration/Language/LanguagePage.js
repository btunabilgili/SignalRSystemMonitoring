import{a as m,b as g,c as e,d as i}from"../../../_chunks/chunk-63R54FMU.js";import{a as l}from"../../../_chunks/chunk-BBDQ5B4V.js";import{a as o,c,d as n,f as s}from"../../../_chunks/chunk-AJ2X4JS3.js";var u=c(l(),1);var a=c(s(),1);var t=class extends a.EntityDialog{constructor(){super(...arguments);this.form=new g(this.idPrefix)}getFormKey(){return g.formKey}getIdProperty(){return e.idProperty}getLocalTextPrefix(){return e.localTextPrefix}getNameProperty(){return e.nameProperty}getService(){return i.baseUrl}};o(t,"LanguageDialog"),t=n([a.Decorators.registerClass("SignalRSystemMonitoring.Administration.LanguageDialog")],t);var p=c(s(),1);var r=class extends p.EntityGrid{useAsync(){return!0}getColumnsKey(){return m.columnsKey}getDialogType(){return t}getIdProperty(){return e.idProperty}getLocalTextPrefix(){return e.localTextPrefix}getService(){return i.baseUrl}afterInit(){super.afterInit()}getDefaultSortBy(){return[e.Fields.LanguageName]}};o(r,"LanguageGrid"),r=n([p.Decorators.registerClass("SignalRSystemMonitoring.Administration.LanguageGrid")],r);$(function(){(0,u.initFullHeightGridPage)(new r($("#GridDiv")).element)});
//# sourceMappingURL=LanguagePage.js.map
