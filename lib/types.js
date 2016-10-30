var ttypes = require('./gen-nodejs/storm_types')
var util = require('./util')

function javacomponent(className) {
	var args = []
	for (var i = 1, ii = arguments.length; i < ii; ++i) {
		args.push(arguments[i])
	}
	return new ttypes.ComponentObject({
		java_object: new ttypes.JavaObject({
			full_class_name: className,
			args_list: args.map(function(arg) {
				return new ttypes.JavaObjectArg(arg)
			})
		})
	})
}

function shellcomponent() {
	return new ttypes.ComponentObject({
		shell: new ttypes.ShellComponent({
			//execution_command: process.argv[0],
      execution_command: 'node',
			script: util.topologyScript()
		})
	})
}

function componentcommon() {
	return new ttypes.ComponentCommon({
		inputs: {},
		streams: {}
	})
}

exports.shellbolt = function shellbolt() {
	return new ttypes.Bolt({
		bolt_object: shellcomponent(),
		common: componentcommon()
	})
}

exports.shellspout = function shellspout() {
	return new ttypes.SpoutSpec({
		spout_object: shellcomponent(),
		common: componentcommon()
	})
}

exports.javabolt = function javabolt() {
	return new ttypes.Bolt({
		bolt_object: javacomponent.apply(null, arguments),
		common: componentcommon()
	})
}

exports.javaspout = function javaspout() {
	return new ttypes.SpoutSpec({
		spout_object: javacomponent.apply(null, arguments),
		common: componentcommon()
	})
}
