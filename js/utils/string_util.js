App.StringUtil = Ember.Object.createWithMixins({
  entityMap: {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': '&quot;',
    "'": '&#39;'
  },

  escapeHtml: function (string) {
    // Adapted from https://github.com/janl/mustache.js/blob/master/mustache.js, I needed
    // to control what characters to escape, and didn't want to escape forward slash, for
    // example since it would be used in math expressions
    var entityMap = this.get('entityMap');
    return String(string).replace(/[&<>"']/g, function (s) {
      return entityMap[s];
    });
  }
});