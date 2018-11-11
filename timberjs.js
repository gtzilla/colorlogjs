'use strict';
/**
  usage:

      const {timberjs} = require("./timberjs");
      const console = timberjs.plant(__filename);

      console.log("My message")
      >  Nov 10 22:38:802 listen_pipe.js: My message

*/

const orig_l = console.log;
const orig_e = console.error;
const _ = require("underscore");
const moment = require("moment");

function logger() {
  let args = _.toArray(arguments);
  let _tag = this.log_tag;
  if(_.indexOf(this.log_tag, "/") > -1) {
    _tag = _.last(this.log_tag.split("/"));  
  }
  
  args.unshift(
    this.log_time_color + moment().format(this.log_time_format),
    this.log_tag_color + _tag+":",
    this.log_message_color);
  // the message(s)
  args.push(this.log_color_end);
  send_to_output.call(this, orig_l, args);
}

function send_to_output(context, args) {
  // this.anything
  context.apply(console, args);  
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
  localize.l = localize.log = function() {
    logger.apply(localize, arguments);
  }
  return localize;
}

module.exports = {
  timberjs:{
    plant,
  },
}