'use strict';
/**
  usage:

      const {colorlogjs} = require("./colorlogjs");
      const console = colorlogjs.start(__filename);

      // log_level. 6-0. Where 0 none and 6 debug. int.
      const console = colorlogjs.start(__filename, {
        log_level:1
      });

      console.log("My message")
      >  Nov 18 23:14:077 command_ai.js:  {266.31757497787476} My message


      Cannot control process.stdout output, formatting or other.
      Only handles log level, log color, log tagging for `console.*`

*/
const _orig_console = console;
const orig_l = console.log;
const orig_i = console.info; 
const orig_d = console.debug; 
const orig_e = console.error;
const orig_w = console.warn;
const _ = require("underscore");
const moment = require("moment");
const {
  performance
} = require('perf_hooks');

function logger(method, args) {
  
  let _tag = this.log_tag;
  if(_.indexOf(this.log_tag, "/") > -1) {
    _tag = _.last(this.log_tag.split("/"));  
  }
  args.unshift(
    this.log_time_color + 
    moment().format(this.log_time_format),
    this.log_tag_color + _tag + ":",
    this.log_message_color,
    "{"+ performance.now() +"}"
    );
    args.push(this.log_color_end);
    send_to_output.call(this, method, args);
}

function send_to_output(method, args) {
  if(_.isFunction(method)) {
    return method.apply(console, args);  
  }
  // THIS should never, ever print. If it does. hrm.
  console.error("Error. Method not a function.");
  return null;
}

function generic_log_caller(is_silent, log_lvl, _logger, local_var, orig_console_mthd) {
  return function() {
    if(is_silent) { return; }
    if(this.log_level < log_lvl) { return; }
    _logger.call(local_var, orig_console_mthd, _.toArray(arguments));    
  }

  
}

function start(tag, opts) {
  opts = opts || {}
  let localize = _.extend({},console);
  localize.log_tag = tag || opts.log_tag || __filename;
  localize.log_level = opts.log_level || 6; // 0 is NONE
  localize.log_tag_color = opts.log_tag_color || "\x1b[96m";
  localize.log_message_color = opts.log_message_color || "\x1b[0m";
  localize.log_time_color = opts.log_time_color || "\x1b[93m";
  localize.log_time_format = opts.log_time_format || "MMM DD HH:mm:SSS";
  localize.log_color_end = opts.log_color_end || "\x1b[0m";
  let is_silent = opts.is_silent;

  // TODO..
  if(opts.log_filepath) { /* writing to file / stream / other */ }
  // short hand added. override others
  /**
    debug 6
    info 4
    warn 3
    error 2
    bare log 1
    0 NONE
  */
  localize.d = localize.debug = generic_log_caller(is_silent, 6, logger, localize, orig_d);
  localize.i = localize.info = generic_log_caller(is_silent, 4, logger, localize, orig_i); 
  localize.w = localize.warn  = generic_log_caller(is_silent, 3, logger, localize, orig_w);
  localize.e = localize.error = generic_log_caller(is_silent, 2, logger, localize, orig_e);
  localize.l = localize.log = generic_log_caller(is_silent, 1, logger, localize, orig_l);

  return localize;
}

function manage_silence(bool) {
  is_silent = !!(bool);
  return is_silent;
}

module.exports = {
  start:start,
  set_silent:manage_silence,
  // deprecating
  colorlogjs:{
    start,
    set_silent:manage_silence,
  },
}