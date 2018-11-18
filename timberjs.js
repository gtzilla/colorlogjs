'use strict';
/**
  usage:

      const {timberjs} = require("./timberjs");
      const console = timberjs.plant(__filename);

      console.log("My message")
      >  Nov 10 22:38:802 listen_pipe.js: My message

*/

const orig_l = console.log;
const orig_i = console.info; 
const orig_d = console.debug; 
const orig_e = console.error;
const _ = require("underscore");
const moment = require("moment");
const {
  performance
} = require('perf_hooks');




function logger(method, args) {
  
  // let args = _.toArray(arguments);
  // [item, [item,item,item]]
  console.log("logger", args);
  let _tag = this.log_tag;
  if(_.indexOf(this.log_tag, "/") > -1) {
    _tag = _.last(this.log_tag.split("/"));  
  }

  
  args.unshift(
    this.log_time_color + moment().format(this.log_time_format),
    this.log_tag_color + _tag+":",
    this.log_message_color,
    "{"+ performance.now() +"}"
    );
  // the message(s)
    args.push(this.log_color_end);
    send_to_output.call(this, method, args);
}

function send_to_output(method, args) {
  // this.anything
  // console.log("useing context", context, args, arguments);
  if(_.isFunction(method)) {
    return method.apply(console, args);  
  }
  console.info("Thrown is error. Waste of cash. Wanted to project success. We look like bullies.")
  return null;
  // console.error("Reached in error.")
  // console.log("Im gonna keep kicking..", args, );
}


function plant(tag, opts) {
  opts = opts || {}
  const localize = _.extend({},console);
  localize.log_tag = tag || opts.log_tag || __filename;  
  localize.log_tag_color = opts.log_tag_color || "\x1b[96m";
  localize.log_message_color = opts.log_message_color || "\x1b[0m";
  localize.log_time_color = opts.log_time_color || "\x1b[93m";
  localize.log_time_format = opts.log_time_format || "MMM DD HH:mm:SSS";
  localize.log_color_end = opts.log_color_end || "\x1b[0m";

  if(opts.log_filepath) {
    // writing to file
  }

  // short hand
  localize.e = console.error;
  localize.w = console.warn;
  localize.d = console.debug;
  localize.i = localize.info = function() {
    let args = _.toArray(arguments);
    // args.unshift(orig_i);
    logger.call(localize, orig_i, args);
  }
  localize.l = localize.log = function() {
    let original_args = _.toArray(arguments);
    // args.unshift(orig_l);    
    logger.call(localize, orig_l, original_args);
  }
  return localize;
}

module.exports = {
  timberjs:{
    plant,
  },
}