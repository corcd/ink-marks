(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Inkmarks = factory());
}(this, (function () { 'use strict';

  function isNodeEnv() {
      return (Object.prototype.toString.call(typeof process !== 'undefined' ? process : 0) === '[object process]');
  }
  const fallbackGlobalObject = {};
  function getGlobalObject() {
      return (isNodeEnv()
          ? global
          : typeof window !== 'undefined'
              ? window
              : typeof self !== 'undefined'
                  ? self
                  : fallbackGlobalObject);
  }
  const defaultFunctionName = '<anonymous>';
  function getFunctionName(fn) {
      try {
          if (!fn || typeof fn !== 'function') {
              return defaultFunctionName;
          }
          return fn.name || defaultFunctionName;
      }
      catch (e) {
          return defaultFunctionName;
      }
  }
  function consoleSandbox(callback) {
      const global = getGlobalObject();
      if (!('console' in global)) {
          return callback();
      }
      const result = callback();
      return result;
  }

  const global$1 = getGlobalObject();
  const PREFIX = 'Ink-Marks Logger';
  class Logger {
      constructor() {
          this._enabled = true;
      }
      disable() {
          this._enabled = false;
      }
      enable() {
          this._enabled = true;
      }
      log(...args) {
          if (!this._enabled) {
              return;
          }
          consoleSandbox(() => {
              global$1.console.log(`${PREFIX}[Log]: ${args.join(' ')}`);
          });
      }
      warn(...args) {
          if (!this._enabled) {
              return;
          }
          consoleSandbox(() => {
              global$1.console.warn(`${PREFIX}[Warn]: ${args.join(' ')}`);
          });
      }
      error(...args) {
          if (!this._enabled) {
              return;
          }
          consoleSandbox(() => {
              global$1.console.error(`${PREFIX}[Error]: ${args.join(' ')}`);
          });
      }
  }
  global$1.__INKMARKS__ = global$1.__INKMARKS__ || {};
  const logger = global$1.__INKMARKS__.logger ||
      (global$1.__INKMARKS__.logger = new Logger());

  const global$2 = getGlobalObject();
  const handlers = {};
  const instrumented = {};
  function addInstrumentationHandler(handler) {
      if (!handler ||
          typeof handler.type !== 'string' ||
          typeof handler.callback !== 'function') {
          return;
      }
      handlers[handler.type] = handlers[handler.type] || [];
      handlers[handler.type].push(handler.callback);
      instrument(handler.type);
  }
  function instrument(type) {
      if (instrumented[type]) {
          return;
      }
      instrumented[type] = true;
      switch (type) {
          case 'DOMContentLoaded':
              instrumentLoad();
              break;
          case 'touch':
              instrumentTouch();
              break;
          case 'click':
              instrumentClick();
              break;
          case 'dblclick':
              instrumentDoubleClick();
              break;
          default:
              logger.warn(`unknown instrumentation type:${type}`);
      }
  }
  function instrumentLoad() {
      if (!('document' in global$2)) {
          return;
      }
      global$2.document.addEventListener('DOMContentLoaded', (ev) => {
          triggerHandlers('DOMContentLoaded', ev);
      }, false);
  }
  function instrumentClick() {
      if (!('document' in global$2)) {
          return;
      }
      global$2.document.addEventListener('click', (ev) => {
          triggerHandlers('click', ev);
      }, false);
  }
  function instrumentDoubleClick() {
      if (!('document' in global$2)) {
          return;
      }
      global$2.document.addEventListener('dblclick', (ev) => {
          triggerHandlers('dblclick', ev);
      }, false);
  }
  function instrumentTouch() {
      if (!('document' in global$2)) {
          return;
      }
      global$2.document.addEventListener('touchstart', (ev) => {
          triggerHandlers('touch', ev);
      }, false);
  }
  function triggerHandlers(type, preload) {
      if (!type || !handlers[type]) {
          return;
      }
      for (const handler of handlers[type] || []) {
          try {
              handler(preload);
          }
          catch (e) {
              logger.error(`Error while triggering instrumentation handler.\nType: ${type}\nName: ${getFunctionName(handler)}\nError: ${e}`);
          }
      }
  }

  const basicCallback = (data) => {
      logger.log(`<basicCallback>${data}`);
  };
  function registerBasicInstrumentation() {
      addInstrumentationHandler({
          callback: basicCallback,
          type: 'DOMContentLoaded',
      });
  }

  const lifecycleCallback = (data) => {
      logger.log(`<lifecycleCallback>${data}`);
  };
  function registerLifecycleInstrumentation() {
      addInstrumentationHandler({
          callback: lifecycleCallback,
          type: 'DOMContentLoaded',
      });
  }

  const interactionCallback = (data) => {
      console.dir(data);
      logger.log('<interactionCallback>');
      if (data.target) {
          logger.log(data.target.nodeName, data.target.className);
          return;
      }
      const elementObject = document.elementFromPoint(data.clientX, data.clientY);
      console.dir(elementObject);
      logger.log(elementObject && elementObject.tagName);
  };
  function registerInteractionInstrumentation() {
      addInstrumentationHandler({
          callback: interactionCallback,
          type: 'click',
      });
      addInstrumentationHandler({
          callback: interactionCallback,
          type: 'dblclick',
      });
      addInstrumentationHandler({
          callback: interactionCallback,
          type: 'touch',
      });
  }

  class Inkmarks {
      constructor() {
          this.name = 'Inkmarks';
          console.log(`[${this.name}] Init`);
      }
      init() {
          registerBasicInstrumentation();
          registerLifecycleInstrumentation();
          registerInteractionInstrumentation();
      }
  }

  return Inkmarks;

})));
