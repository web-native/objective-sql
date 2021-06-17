!function(e){var t={};function r(a){if(t[a])return t[a].exports;var s=t[a]={i:a,l:!1,exports:{}};return e[a].call(s.exports,s,s.exports,r),s.l=!0,s.exports}r.m=e,r.c=t,r.d=function(e,t,a){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(r.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var s in e)r.d(a,s,function(t){return e[t]}.bind(null,s));return a},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=0)}([function(e,t,r){"use strict";r.r(t);var a=function(e){return Array.isArray(e)},s=function(e){return e instanceof String||"string"==typeof e&&null!==e},n=function(e){return arguments.length&&(void 0===e||void 0===e)},i=function(e){return null===e||""===e},o=function(e){return"function"==typeof e},c=function(e){return Array.isArray(e)||"object"==typeof e&&e||o(e)},d=function(e){return i(e)||n(e)||!1===e||0===e||c(e)&&!Object.keys(e).length},h=function(e){return!Array.isArray(e)&&"object"==typeof e&&e},u=function(e,t=!0){return a(e)?e:!t&&h(e)?[e]:!1!==e&&0!==e&&d(e)?[]:function(e){return!s(e)&&!n(e.length)}(e)?Array.prototype.slice.call(e):h(e)?Object.values(e):[e]},l=function(e){return function(e){return e instanceof Number||"number"==typeof e}(e)||!0!==e&&!1!==e&&null!==e&&""!==e&&!isNaN(1*e)},f=function(e,t){var r=void 0;return c(e)&&Object.keys(e).forEach((a,s)=>{!1!==r&&(r=t(l(a)?parseFloat(a):a,e[a],s))}),r};class m{constructor(){this.$={schema:{}},this.defaultDB="db1",this.defaultDBParams={}}async bindSchema(e){if(!h(e))throw new Error("Schema must be an object.");return this.$.schema=e,this}async setDefaultDB(e,t=this.defaultDBParams){return this.defaultDB=e,this.defaultDBParams=t,this}async createDatabaseIfNotExists(e,t=this.defaultDBParams){return(t={...t}).ifNotExists=!0,this.createDatabase(e,t)}async dropDatabaseIfExists(e,t={}){return(t={...t}).ifExists=!0,this.dropDatabase(e,t)}async importDatabase(e,t,r={}){if((await this.databases(e,r)).length){if(r.ifNotExists)return;throw new Error(`Database ${e} already exists.`)}if(!h(t.schema)||t.data&&!h(t.data))throw new Error("Malformed import data.");var s=await this.createDatabase(e,r);return Promise.all(Object.keys(t.schema).map(async e=>{var r=t.schema[e],n=(t.data||{})[e];if(l(e)&&(e=r.name),!e||!h(r)||n&&!a(n))throw new Error(`Malformed import data for table ${e}.`);return(await s.createTable(e,r)).addAll(n||[])}))}async exportDatabase(e,t){if(!(await this.databases(e,t)).length){if(t.ifExists)return;throw new Error(`Database ${e} does not exist.`)}var r=await this.database(e,t),a={schema:{},data:{}},s=await r.tables();return await Promise.all(s.map(async e=>{var t=await r.table(e);a.schema[e]=await t.getSchema(),a.data[e]=await t.getAll()})),a}getDatabaseSchema(e=this.defaultDB){return this.$.schema[e]||{}}setDatabaseSchema(e,t){const r={};return f(t,(e,t)=>{t.name&&t.name!==e?(r[t.name]=t,delete t.name):r[e]=t}),this.$.schema[e]=r,this}unsetDatabaseSchema(e){return delete this.$.schema[e],this}matchDatabaseList(e,t=null,r=[]){return e.filter(e=>(n(t)||i(t)||e.name===t)&&(d(r)||!("version"in r)||!("version"in e)||e.version===r.version))}}var y=function(e){return o(e)||e&&"[object function]"==={}.toString.call(e)},p=function(e,t,r=null){return a(t)?e.filter(e=>r?t.filter(t=>r(e,t)).length:-1!==t.indexOf(e)):[]},b=function(e,t,r=null){return a(t)?e.filter(e=>r?t.filter(t=>r(e,t)).length:-1===t.indexOf(e)):[]};class w{constructor(e,t,r){this.driver=e,this.databaseName=t,this.def=r}async tables(){}async table(e){}async createTable(e,t={},r={}){}async alterTable(e,t,r={}){}async dropTable(e,t={}){}getTableSchema(e){return this.driver.getDatabaseSchema(this.databaseName)[e]}setTableSchema(e,t){const r={};f(t.columns,(e,t)=>{t.name&&t.name!==e?(r[t.name]=t,delete t.name):r[e]=t}),t.columns=r;const a=this.driver.getDatabaseSchema(this.databaseName);return a[e]=t,this.driver.setDatabaseSchema(this.databaseName,a),this}unsetTableSchema(e){return delete this.driver.getDatabaseSchema(this.databaseName)[e],this}cloneTableSchema(e){if(h(e)){var t={};return f(e,(e,r)=>{t[e]=this.cloneTableSchema(r)}),t}return a(e)?e.map(e=>this.cloneTableSchema(e)):e}diffTableSchema(e,t,r){const a={columns:{add:{},alter:{},drop:{}},primaryKey:{},foreignKeys:{add:{},alter:{},drop:{}},indexes:{add:{},alter:{},drop:{}},jsonColumns:{add:{},alter:{},drop:{}},renamedColumns:{},renameTo:null},s={columns:(e,t,r)=>{var s=Object.keys("drop"===e?{}:t),n=Object.keys("add"===e?{}:r);b(s,n).forEach(e=>{a.columns.add[e]=t[e],t[e].primaryKey&&(a.primaryKey.add=e),t[e].referencedEntity&&(a.foreignKeys.add["fk_index__"+e]={columnName:e,...t[e].referencedEntity}),t[e].index&&(a.indexes.add["index__"+e]={keys:e,type:"index"}),t[e].unique&&(a.indexes.add["unique_index__"+e]={keyPath:e,type:"unique"}),t[e].fulltext&&(a.indexes.add["fulltext_index__"+e]={keyPath:e,type:"fulltext"}),"json"===(t[e].type||"").toLowerCase()&&(a.jsonColumns.add["json_check_constraint__"+e]=e)}),p(s,n).forEach(e=>{var s,n=Object.keys(t[e]),i=Object.keys(r[e]),o={current:t[e],prev:r[e],addedProps:b(n,i),alteredProps:p(n,i).filter(a=>!g(t[e][a],r[e][a])),droppedProps:b(i,n)};b((s=[].concat(o.addedProps,o.alteredProps,o.droppedProps),s.filter((e,t,r)=>r.indexOf(e)===t)),["name","primaryKey","referencedEntity","index","unique","fulltext"]).length&&(a.columns.alter[e]=o),(o.addedProps.includes("name")||o.alteredProps.includes("name")&&t[e].name!==e)&&(a.renamedColumns[e]=t[e].name),o.addedProps.includes("primaryKey")||o.alteredProps.includes("primaryKey")&&t[e].primaryKey?a.primaryKey.add=e:(o.droppedProps.includes("primaryKey")||o.alteredProps.includes("primaryKey")&&!t[e].primaryKey)&&(a.primaryKey.drop=e),o.addedProps.includes("referencedEntity")||o.alteredProps.includes("referencedEntity")&&t[e].referencedEntity?a.foreignKeys.add["fk_index__"+e]=t[e].referencedEntity:(o.droppedProps.includes("referencedEntity")||o.alteredProps.includes("referencedEntity")&&!t[e].referencedEntity)&&(a.foreignKeys.drop["fk_index__"+e]=r[e].referencedEntity),o.addedProps.includes("index")||o.alteredProps.includes("index")&&t[e].index?a.indexes.add["index__"+e]={keys:e,type:"index"}:(o.droppedProps.includes("index")||o.alteredProps.includes("index")&&!t[e].index)&&(a.indexes.drop["index__"+e]={keys:e,type:"index"}),o.addedProps.includes("unique")||o.alteredProps.includes("unique")&&t[e].unique?a.indexes.add["unique_index__"+e]={keyPath:e,type:"unique"}:(o.droppedProps.includes("unique")||o.alteredProps.includes("unique")&&!t[e].unique)&&(a.indexes.drop["unique_index__"+e]={keyPath:e,type:"unique"}),o.addedProps.includes("fulltext")||o.alteredProps.includes("fulltext")&&t[e].fulltext?a.indexes.add["fulltext_index__"+e]={keyPath:e,type:"fulltext"}:(o.droppedProps.includes("fulltext")||o.alteredProps.includes("fulltext")&&!t[e].fulltext)&&(a.indexes.drop["fulltext_index__"+e]={keyPath:e,type:"fulltext"}),(o.addedProps.includes("type")||o.alteredProps.includes("type"))&&"json"===(t[e].type||"").toLowerCase()?a.jsonColumns.add["json_check_constraint__"+e]=e:(o.droppedProps.includes("type")||o.alteredProps.includes("type"))&&"json"===(r[e].type||"").toLowerCase()&&(a.jsonColumns.drop["json_check_constraint__"+e]=e)}),b(n,s).forEach(e=>{a.columns.drop[e]=r[e],r[e].primaryKey&&(a.primaryKey.drop=e),r[e].referencedEntity&&(a.foreignKeys.drop["fk_index__"+e]=r[e].referencedEntity),r[e].index&&(a.indexes.drop["index__"+e]={keys:e,type:"index"}),r[e].unique&&(a.indexes.drop["unique_index__"+e]={keyPath:e,type:"unique"}),r[e].fulltext&&(a.indexes.drop["fulltext_index__"+e]={keyPath:e,type:"fulltext"}),"json"===(r[e].type||"").toLowerCase()&&(a.jsonColumns.drop["json_check_constraint__"+e]=!0)})},name:(e,t)=>{"drop"!==e&&t!==r&&(a.renameTo=t)},primaryKey:(e,t,r)=>{u(t).join("___")!==u(r).join("___")&&(a.primaryKey[e]="drop"===e?r:t)},foreignKeys:(e,t,r)=>{var s=Object.keys("drop"===e?{}:t),n=Object.keys("add"===e?{}:r);b(s,n).forEach(e=>{a.foreignKeys.add[e]=t[e]}),p(s,n).forEach(e=>{a.foreignKeys.alter[e]={current:t[e],prev:r[e]}}),b(n,s).forEach(e=>{a.foreignKeys.drop[e]=r[e]})},indexes:(e,t,r)=>{var s=Object.keys("drop"===e?{}:t),n=Object.keys("add"===e?{}:r);b(s,n).forEach(e=>{a.indexes.add[e]=t[e]}),p(s,n).forEach(e=>{a.indexes.alter[e]={current:t[e],prev:r[e]}}),b(n,s).forEach(e=>{a.indexes.drop[e]=r[e]})}};var n=Object.keys(t),i=Object.keys(e);return b(n,i).forEach(e=>{s[e]("add",t[e],null)}),p(n,i).forEach(r=>{s[r]("alter",t[r],e[r])}),b(i,n).forEach(t=>{s[t]("drop",null,e[t])}),a}validateSchema(e,t=!1){try{if(!h(e))throw new Error("Table definition must be an object.");if(!e.name)throw new Error("Table must have a name.");if(!h(e.columns))throw new Error('Table must have a valid "columns" list.');f(e.columns,(t,r)=>{if(!h(r))throw new Error('Invalid column definition: "'+t+'" at "'+e.name+'".');if(r.referencedEntity&&(!h(r.referencedEntity)||!r.referencedEntity.name))throw new Error('Invalid foreign key definition: "'+t+'" at "'+e.name+'".')})}catch(e){if(t)throw e;return!1}return!0}}const g=(e,t)=>{if(e===t)return!0;if(a(e)&&a(t)&&e.length===t.length)return e.reduce((e,r)=>e&&t.includes(r),!0);var r={};return!(!h(e)||!h(t)||(r.keys_a=Object.keys(e)).length!==(r.keys_b=Object.keys(t)).length)&&r.keys_a.reduce((r,a)=>r&&g(e[a],t[a]),!0)};var x=class extends Error{},_=function(e,t,r){return e.startsWith(t)&&e.endsWith(r)};class v{constructor(e,t,r,a={}){this.database=e,this.name=t,this.def=r,this.params=a,d(r.schema)&&(r.schema={primaryKey:"",columns:{},indexes:{},derived:!0})}getKeyPathForPrimaryKey(){var e=Object.keys(this.def.schema.columns).filter(e=>this.def.schema.columns[e].primaryKey);return!e.length&&this.def.schema.primaryKey&&(e=u(this.def.schema.primaryKey)),e}getKeyPathsForIndex(e){var t=Object.keys(this.def.schema.columns).filter(t=>this.def.schema.columns[t][e]);return this.def.schema.indexes&&Object.keys(this.def.schema.indexes).filter(t=>this.def.schema.indexes[t].type===e).forEach(e=>{t.push(u(this.def.schema.indexes[e].keyPath))}),t}async syncCursor(e){return await this.putAll(e.cache)}async match(e){var t,r;if(this.def.schema.primaryKey&&(t=E(e,this.def.schema.primaryKey))&&(r=await this.get(t)))return{matchingKey:"PRIMARY_KEY",primaryKey:t,row:r};var a,s=Object.keys(this.def.schema.indexes).filter(e=>"unique"===this.def.schema.indexes[e].type);return s.length&&(await this.getAll()).forEach((t,r)=>{a||s.forEach(s=>{var n=this.def.schema.indexes[s].keyPath;t&&E(e,n)===E(t,n)&&(a={matchingKey:s,primaryKey:this.def.schema.primaryKey?E(t,this.def.schema.primaryKey):r,row:{...t}})})}),a}async addAll(e,t=[],r=null,a=!1){var s,n=[],i=await Promise.all(e.map(async(e,a)=>{var i={};if(h(e))i=e;else{var o=t.length?t:Object.keys(this.def.schema.columns);if(o.length&&o.length!==e.length)throw new Error("Column/values count mismatch at line "+a+"!");o.forEach((t,r)=>{i[t]=e[r]})}return this.handleInput(i,!0),this.shouldMatchInput(i)||r?s=new Promise(async e=>{await s;var t=await this.match(i);if(t&&r){var a={...t.row};return r(a,i)&&n.push(a),e("0")}await this.beforeAdd(i,t),e(this.add(i))}):(await this.beforeAdd(i),this.add(i))}));return n.length&&(i=i.concat(await this.putAll(n))),i.filter((e,t)=>0!==e&&i.indexOf(e)===t)}async beforeAdd(e,t){var r=(new Date).toISOString();f(this.def.schema.columns||{},(t,a)=>{"datetime"!==a.type&&"timestamp"!==a.type||"CURRENT_TIMESTAMP"!==a.default||(e[t]=r)})}async putAll(e){var t;return await Promise.all(e.map(async e=>(this.handleInput(e),this.shouldMatchInput(e)?t=new Promise(async r=>{await t,await this.beforePut(e,await this.match(e)),r(this.put(e))}):(await this.beforePut(e),this.put(e)))))}async beforePut(e,t){if(t&&!function(e,t){return e.reduce((e,r,a)=>e&&t(r,a),!0)}(Object.keys(e),r=>e[r]===t.row[r])){var r=(new Date).toISOString();f(this.def.schema.columns||{},(t,a)=>{"datetime"!==a.type&&"timestamp"!==a.type||"CURRENT_TIMESTAMP"!==a.onupdate||(e[t]=r)})}}async deleteAll(e){return await Promise.all(e.map(async e=>this.delete(await this.beforeDelete(e))))}async beforeDelete(e){return e}handleInput(e,t=!1){var r=Object.keys(e),a=Object.keys(this.def.schema.columns),o=r.filter(e=>-1===a.indexOf(e));if(o.length)throw new Error("Unknown column: "+o[0]);a.forEach(a=>{var o=e[a],d=h(this.def.schema.columns[a])?this.def.schema.columns[a]:{};if(r.includes(a)?"json"===d.type?c(_value)||s(o)&&(_(o,"[","]")||_(o,"{","}")):["char","tinytext","smalltext","text","bigtext","varchar"].includes(d.type)?s(o):["bit","tinyint","smallint","int","bigint","decimal","number","float","real"].includes(d.type)||["enum","set"].includes(d.type)?l(o):["date","datetime","timestamp"].includes(d.type)&&s(o):t&&!p(u(a),u(this.def.schema.primaryKey)).length&&(e[a]=!("default"in d)||["date","datetime","timestamp"].includes(d.type)&&"CURRENT_TIMESTAMP"===d.default?null:d.default),!1===d.nullable&&(i(e[a])||n(e[a])))throw new Error("Inserting NULL on non-nullable column: "+a)})}shouldMatchInput(e){return Object.keys(this.def.schema.columns).filter(e=>{var t=this.def.schema.columns[e];return["datetime","timestamp"].includes(t.type)&&("CURRENT_TIMESTAMP"===t.default||"CURRENT_TIMESTAMP"===t.onupdate)}).length}}const E=(e,t)=>u(t).map(t=>e[t]).filter(e=>e).join("-");class P{constructor(e){this.cache=e,this.key=0,this.flags={},this._onfinish=[]}onfinish(e){this._onfinish.push(e)}next(){if(!this.cache.length||this.key===this.cache.length-1)return this.__eof=!0,this._onfinish.forEach(e=>e()),void(this.key=0);this.key++}eof(){return!this.cache.length||this.key===this.cache.length-1}async fetch(){if(this.key<this.cache.length)return this.cache[this.key]}}class S extends P{}class k extends v{constructor(e,t,r,a={}){super(...arguments),this.ongoingWrite=null}getCursor(){return new S((this.def.data||[]).reduce((e,t)=>e.concat(t?{...t}:void 0),[]).filter(e=>e))}async getAll(){return(this.def.data||[]).reduce((e,t)=>e.concat(t?{...t}:void 0),[])}async get(e){var t=Object.keys(this.def.schema.columns).filter(e=>this.def.schema.columns[e].primaryKey)[0],r=Object.keys(this.def.schema.columns).filter(e=>this.def.schema.columns[e].autoIncrement)[0];if(!t)throw new Error("Table must define a Primary Key to fetch an item by Primary Key.");var a=this.def.data;return e=u(e).join("-"),t===r?a[e-1]?{...a[e-1]}:void 0:a[e]?{...a[e]}:void 0}async count(){return this.def.data.length}shouldMatchInput(e){return this.def.schema.primaryKey||super.shouldMatchInput(e)}async beforeAdd(e,t){if(t)throw new x("Inserting duplicate values on unique key constraint: "+t.matchingKey);j(this.def.data,e,this.def.schema.primaryKey,this.def.schema.autoIncrement),await super.beforeAdd(e,t)}add(e){return this.ongoingWrite=new Promise(async(t,r)=>{try{await this.ongoingWrite}catch(e){}var a=this.def.data,s=D(e,this.def.schema.primaryKey);this.def.schema.autoIncrement?a[s-1]=e:a[s]=e,t(s)}),this.ongoingWrite}async beforePut(e,t){t?f(t.row,(t,r)=>{t in e||(e[t]=r)}):j(this.def.data,e,this.def.schema.primaryKey,this.def.schema.autoIncrement);await super.beforePut(e,t)}put(e){return this.ongoingWrite=new Promise(async t=>{try{await this.ongoingWrite}catch(e){}var r=this.def.data,a=D(e,this.def.schema.primaryKey);this.def.schema.autoIncrement?r[a-1]=e:r[a]=e,t(a)}),this.ongoingWrite}delete(e,t=!0){return this.ongoingWrite=new Promise(async(r,a)=>{try{await this.ongoingWrite}catch(e){}var s,n=this.def.data;if(this.def.schema.autoIncrement?n[e-1]&&(delete n[e-1],s=e):n[e]&&(delete n[e],s=e),!s&&t)return a(new Error("The given row (with "+u(this.def.schema.primaryKey).join(",")+" = "+s+") does not exist in the store."));r(s)}),this.ongoingWrite}async clear(){return this.def.data.splice(0),!0}}var D=(e,t)=>u(t).map(t=>e[t]).filter(e=>e).join("-");function j(e,t,r,a){if(r){var s=D(t,r),n=u(r);if(n.length>1)throw new Error("The Auto-Increment flag cannot be used with Composite Primary Keys.");return s=e.length+1,t[n[0]]=s,s}}class T extends w{async tables(){return Object.keys(this.def.schema)}async table(e,t={}){return new k(this,e,{schema:this.def.schema[e],data:this.def.data[e]},t)}async createTable(e,t,r={}){if((await this.tables()).includes(e)){if(r.ifNotExists)return;throw new Error(`Store name "${e}" already exists!`)}return this.def.schema[e]=t,this.def.data[e]=[],new k(this,e,{schema:this.def.schema[e],data:this.def.data[e]})}async alterTable(e,t,r={}){var a,s=await this.getTableSchema(e);if(y(t))a=this.cloneSchema(s),await t(a);else{if(!h(callback))throw new Error("Table/store modification expects only an object (new schema) or a function (callback that recieves existing schema).");a=t}if(!(await this.tables()).includes(e)){if(r.ifExists)return;throw new Error(`Store name "${e}" does not exist!`)}var n=this.def.data[e];return f(this.diffSchema(s,a),(e,t)=>{"renamedColumns"!==e?(f(t.add,(t,r)=>{this.applyToStore[e](n,t,r,"add")}),f(t.alter,(t,r)=>{this.applyToStore[e](n,t,r.current,"alter")}),f(t.drop,(t,r)=>{this.applyToStore[e](n,t,r,"drop")})):f(t,(t,r)=>{this.applyToStore[e](n,t,r)})}),new k(this,e,{schema:this.def.schema[e],data:n},{})}async dropTable(e,t={}){if(!(await this.tables()).includes(e)){if(t.ifExists)return;throw new Error(`Store name "${e}" does not exist!`)}delete this.def.schema[e],delete this.def.data[e]}async getTableSchema(e){return this.def.schema[e]}}T.prototype.applyToStore={primaryKey:(e,t,r,a)=>{},columns:(e,t,r,a)=>{},foreignKeys:(e,t,r,a)=>{},indexes:(e,t,r,a)=>{"drop"!==a?("alter"===a&&e.indexNames.contains(t)&&e.deleteIndex(t),e.createIndex(t,r.keyPath,{unique:"unique"===r.type})):e.deleteIndex(t)},jsonColumns:(e,t,r,a)=>{},renamedColumns:(e,t,r)=>"ALTER COLUMN `"+t+"` RENAME TO `"+r+"`"};class K extends P{constructor(e){super([]),this._store=e,this._storeFetch=new Promise(async e=>{(await this._store).getAll().onsuccess=t=>{this.cache=u(t.target.result),e()}})}async fetch(){return await this._storeFetch,super.fetch()}}class O{constructor(e){this._store=e,this.cache=[],this.key=0,this._onfinish=[],this.flags={}}onfinish(e){this._onfinish.push(e)}next(){if(this._eof){if(!this.cache.length||this.key===this.cache.length-1)return this._onfinish.forEach(e=>e()),void(this.key=0);this.key++}else{if(!this._cursorRequest)throw new Error("fetch() must be called before calling next()");this.key++}}eof(){return this._eof&&(!this.cache.length||this.key===this.cache.length-1)}async fetch(){var e=await this._store;return new Promise(t=>{this._eof||this.key<this.cache.length?t(this.cache[this.key]):this._countRequest?(this._handleCursorFetch(t),this._continueCursor()):(this._countRequest=e.count(),this._countRequest.onsuccess=r=>{this._count=r.target.result,this._cursorRequest=e.openCursor(),this._handleCursorFetch(t),this._continueCursor=()=>this._cursor.continue()})})}_handleCursorFetch(e){this._cursorRequest.onsuccess=t=>{if(this._cursor=t.target.result,this._cursor){var r=this._cursor.value;this.cache.push(r),this.cache.length===this._count&&(this._eof=!0),e(r)}else this._eof=!0,e()}}}class I extends v{getCursor(){return new K(this.def.getStore())}getProgressiveCursor(){return new O(this.def.getStore())}getAll(){return new Promise(async(e,t)=>{var r=(this.tx_store||this.def.getStore("readonly")).getAll();r.onsuccess=t=>e(u(t.target.result)),r.onerror=e=>t(e.target.error)})}get(e){return new Promise(async(t,r)=>{e=l(e)?parseInt(e):e;var a=(this.tx_store||this.def.getStore("readonly")).get(e);a.onsuccess=e=>t(e.target.result),a.onerror=e=>r(e.target.error)})}count(...e){return new Promise(async(t,r)=>{var a=this.def.getStore().count(...e);a.onsuccess=e=>t(e.target.result),a.onerror=e=>r(e.target.error)})}addAll(e,t=[],r=null){return this.tx_store=this.def.getStore(),super.addAll(...arguments)}add(e){return new Promise(async(t,r)=>{var a=(this.tx_store||this.def.getStore()).add(e);a.onsuccess=e=>t(e.target.result),a.onerror=e=>{var t=e.target.error;"ConstraintError"===t.name?r(new x(t.message)):r(t)}})}putAll(e){return this.tx_store=this.def.getStore(),super.putAll(...arguments)}put(e){return new Promise(async(t,r)=>{var a=(this.tx_store||this.def.getStore()).put(e);a.onsuccess=e=>t(e.target.result),a.onerror=e=>r(e.target.error)})}deleteAll(e){return this.tx_store=this.def.getStore(),super.deleteAll(...arguments)}delete(e){if(a(e)){if(e.length>1)throw new Error("IDB does not support Composite Primary Keys");e=e[0]}return e=l(e)?parseInt(e):e,new Promise(async(t,r)=>{var a=(this.tx_store||this.def.getStore()).delete(e);a.onsuccess=r=>t(e),a.onerror=e=>r(e.target.error)})}}class A extends w{async tables(){return u(this.def.objectStoreNames)}async table(e,t={}){return new I(this,e,{schema:await this.getTableSchema(e),getStore:r=>this.def.transaction([e],r||t.mode).objectStore(e)},t)}async createTable(e,t,r={}){return this.driver.alterDatabase(this.name,a=>{if(u(a.objectStoreNames).includes(e)){if(r.ifNotExists)return;throw new Error(`Store name "${e}" already exists!`)}var s={},n=Object.keys(t.columns).filter(e=>t.columns[e].primaryKey)[0],i=Object.keys(t.columns).filter(e=>t.columns[e].autoIncrement)[0];n&&(s.keyPath=n,n===i&&(s.autoIncrement=!0));var o=a.createObjectStore(e,s);return f(this.diffSchema({},t),(e,t)=>{"primaryKey"!==e&&f(t.add,(t,r)=>{this.applyToStore[e](o,t,r)})}),this.def.schema[e]=t,new I(this,e,{schema:t,getStore:()=>o},{})})}async alterTable(e,t,r={}){var a,s=await this.getTableSchema(e);if(y(t))a=this.cloneSchema(s),await t(a);else{if(!h(callback))throw new Error("Table/store modification expects only an object (new schema) or a function (callback that recieves existing schema).");a=t}return this.driver.alterDatabase(this.name,t=>{if(!u(t.objectStoreNames).includes(e)){if(r.ifExists)return;throw new Error(`Store name "${e}" does not exist!`)}var n=t.transaction([e],"readwrite").objectStore(e);return f(this.diffSchema(s,a),(e,t)=>{"renamedColumns"!==e?(f(t.add,(t,r)=>{this.applyToStore[e](n,t,r,"add")}),f(t.alter,(t,r)=>{this.applyToStore[e](n,t,r.current,"alter")}),f(t.drop,(t,r)=>{this.applyToStore[e](n,t,r,"drop")})):f(t,(t,r)=>{this.applyToStore[e](n,t,r)})}),this.def.schema[e]=a,new I(this,e,{schema:s,getStore:()=>n},{})})}async dropTable(e,t={}){return this.driver.alterDatabase(this.name,r=>{if(u(r.objectStoreNames).includes(e)){if(t.ifExists)return;throw new Error(`Store name "${e}" does not exist!`)}delete this.def.schema[e],r.deleteObjectStore(e)})}async getTableSchema(e){return this.def.schema[e]}}A.prototype.applyToStore={primaryKey:(e,t,r,a)=>{},columns:(e,t,r,a)=>{},foreignKeys:(e,t,r,a)=>{},indexes:(e,t,r,a)=>{"drop"!==a?("alter"===a&&e.indexNames.contains(t)&&e.deleteIndex(t),e.createIndex(t,r.keyPath,{unique:"unique"===r.type})):e.deleteIndex(t)},jsonColumns:(e,t,r,a)=>{},renamedColumns:(e,t,r)=>"ALTER COLUMN `"+t+"` RENAME TO `"+r+"`"};window.WebQit||(window.WebQit={}),window.WebQit.ObjectiveSQL={ODB:class extends m{constructor(){super(),this.$.data={},this.name="odb"}async databases(e=null,t={}){var r=Object.keys(this.$.schema).map(e=>({name:e}));return this.matchDatabaseList(r,e,t)}async database(e=this.defaultDB,t=this.defaultDBParams){if(t.version&&!l(t.version))throw new Error("Database version (params.version) must be numeric.");return(await this.databases(e,t)).length,e in this.$.data||(this.setDatabaseSchema(e,{}),this.$.data[e]={}),new T(this,e,{schema:this.getDatabaseSchema(e),data:this.$.data[e]},t)}async createDatabase(e,t=this.defaultDBParams){if((await this.databases(e,t)).length){if(t.ifNotExists)return;throw new Error(`Database ${e} already exists.`)}return this.setDatabaseSchema(e,{}),this.$.data[e]={},await this.setDefaultDB(e,t),new T(this,e,{schema:this.getDatabaseSchema(e),data:this.$.data[e]},t)}async dropDatabase(e,t={}){if(!(await this.databases(e,t)).length){if(t.ifExists)return;throw new Error(`Database ${e} does not exist.`)}this.unsetDatabaseSchema(e)}async query(e,t=[],r={}){return(r={...r}).vars=t,r.dbDriver=this,ObjSQL.parse(e,null,r).eval(this)}},IDB:class extends m{constructor(){if(super(),"undefined"==typeof indexedDB)throw new Error("IndexedDB is not in scope.");this.indexedDB=indexedDB,this.name="idb"}async databases(e=null,t={}){var r=u(await this.indexedDB.databases());return this.matchDatabaseList(r,e,t)}async database(e=this.defaultDB,t=this.defaultDBParams){return new Promise(r=>{this.indexedDB.open(e,t.version||0).onsuccess=a=>{r(new A(this,e,{database:a.target.result},t))}})}async createDatabase(e,t=this.defaultDBParams){if((await this.databases(e,t)).length){if(t.ifNotExists)return;throw new Error(`Database ${e} already exists.`)}return new Promise(r=>{var a=this.indexedDB.open(e,t.version);(schema||[]).length&&(a.onupgradeneeded=e=>{}),a.onsuccess=a=>{this.setDatabaseSchema(e,{}),this.setDefaultDB(e,t).then(()=>{r(new A(this,e,{database:a.target.result,schema:this.getDatabaseSchema(e)},t))})}})}async alterDatabase(e,t,r){if(!l(t.version))throw new Error("Database version (params.version) must be numeric.");if(!(await this.databases(e,t.version)).length){if(t.ifExists)return;throw new Error(`Database ${e} does not exist.`)}return new Promise(a=>{var s,n,i=this.indexedDB.open(e,t.version);i.onupgradeneeded=e=>{s=!0,n=r(e.target.result)},i.onsuccess=r=>{if(!s)throw new Error(`Store name "${e}@${t.version}" could not be accessed for modification!`);a(n)}})}async dropDatabase(e,t={}){if(!(await this.databases(e,t)).length){if(t.ifExists)return;throw new Error(`Database ${e} does not exist.`)}return new Promise(t=>{this.indexedDB.deleteDatabase(e).onsuccess=r=>{this.unsetDatabaseSchema(e),t(!0)}})}async query(e,t=[],r={}){return(r={...r}).vars=t,r.dbDriver=this,ObjSQL.parse(e,null,r).eval(this)}}}}]);
//# sourceMappingURL=main.js.map