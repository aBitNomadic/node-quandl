var _ = require("lodash");
var request = require([__dirname, "request"].join("/"));

module.exports = {

    dataset: function(code, options, fn){
        if(_.isFunction(options) && _.isUndefined(fn)){
            fn = options;
            options = {};
        }
        options = options || {};

        var format = options.format || "json";
        delete options.format;

        var qs = options;
        qs.api_key = this.api_key;

        var config = {
            uri: ["api", this.api_version, "datasets", code.source, code.table].join("/"),
            format: format,
            qs: qs,
            proxy: this.proxy
        }

        return request.create(config, fn);
    },

    datatables: function(code, options, fn){
        if(_.isFunction(options) && _.isUndefined(fn)){
            fn = options;
            options = {};
        }
        options = options || {};

        var format = options.format || "json";
        delete options.format;

        var qs = options;
        qs.api_key = this.api_key;

        var config = {
            uri: ["api", this.api_version, "datatables", code.source, code.table].join("/"),
            format: format,
            qs: qs,
            proxy: this.proxy
        }

        return request.create(config, fn);
    },

    metadata: function(code, options, fn){
        options = options || {};
        options.exclude_data = true;
        return this.dataset(code, options, fn);
    },

    multiset: function(codes, options, fn){
        if(_.isFunction(options) && _.isUndefined(fn)){
            fn = options;
            options = {};
        }
        options = options || {};

        var format = options.format || "json";
        delete options.format;

        var qs = options;
        qs.api_key = this.api_key;

        qs.columns = _.map(codes, function(code){
            var combined_code = [code.source, code.table].join(".");

            code = _.defaults(code, {
                columns: []
            });
            columns = code.columns.join(".");

            if(!_.isEmpty(columns))
                combined_code = [combined_code, columns].join(".");

            return combined_code;
        }).join(",");

        var config = {
            uri: ["api", this.api_version, "multisets"].join("/"),
            format: format,
            qs: qs,
            proxy: this.proxy
        }

        return request.create(config, fn);
    },

    favorites: function(options, fn){
        if(_.isFunction(options) && _.isUndefined(fn)){
            fn = options;
            options = {};
        }
        options = options || {};

        var format = options.format || "json";
        delete options.format;

        var qs = options;
        qs.api_key = this.api_key;

        var config = {
            uri: ["api", this.api_version, "current_user", "collections", "datasets", "favourites"].join("/"),
            format: format,
            qs: qs,
            proxy: this.proxy
        }

        return request.create(config, fn);
    },

    search: function(terms, options, fn){
        if(_.isFunction(options) && _.isUndefined(fn)){
            fn = options;
            options = {};
        }
        options = options || {};

        var format = options.format || "json";
        delete options.format;

        var qs = options;
        qs.api_key = this.api_key;
        qs.query = terms.replace(" ", "+");

        var config = {
            uri: ["api", this.api_version, "datasets"].join("/"),
            format: format,
            qs: qs,
            proxy: this.proxy
        }

        return request.create(config, fn);
    },

    delta: function(code, options, fn){
        if(_.isFunction(options) && _.isUndefined(fn)){
            fn = options;
            options = {};
        }
        options = options || {};

        var format = options.format || "json";
        delete options.format;

        var qs = options;
        qs.api_key = this.api_key;

        var config = {
            uri: ["api", this.api_version, "datatables", code.source, code.table, "delta"].join("/"),
            format: format,
            qs: qs,
            proxy: this.proxy
        }

        return request.create(config, fn);
    }
}
