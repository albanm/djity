
function init_themeroller(){
	themeroller_widgetify();
	edited_project_style = false;
	edited_timer_id = setInterval("check_edited_project_style()",1000);
};

function open_project_css(){
	window.open(project_css);
};

function check_edited_project_style(){
	if(edited_project_style){
		$(".editable_css",top.document).each(function(){
			var current_href = $(this).attr('href');
			$(this).attr('href',current_href.split('?')[0]+'?'+get_edited_project_style(true));
		});
	};
	edited_project_style = false;
};

function get_edited_project_style(as_uri){
	/*
	 * Create a dictionary from fields in the project style dialog
	 */
	var style_values = {};
	$('input').each(function(i){
		style_values[this.id] = $(this).val();	
	});
	style_values['extra'] = $("#style_code_extra").val()
	if(as_uri){
		var style_text = ""
		for(style in style_values){
			style_text += style+"="+encodeURIComponent(style_values[style])+"&"
		};
		return style_text
	};
	return style_values;
}

function themeroller_widgetify(){
	/*
	 * Prepare the whole theme rolling dialog widget
	 */
	$("#style_tabs").tabs({});

	$("#style_accordion").accordion({collapsible:true});

	$("input").change(function(){
		edited_project_style = true;
	});

	$(".color").ColorPicker({
		
		onSubmit: function(hsb, hex, rgb, el) {
			$(el).val('#'+hex);
			$(el).ColorPickerHide();
			edited_project_style = true;
		},
		onBeforeShow: function () {
			$(this).ColorPickerSetColor(this.value.substr(1,this.value.length-1));
		},
		onShow: function () {
			$('.colorpicker').css('left','0px');
			$('.colorpicker').css('z-index','4');
		},
	})
	.bind('keyup', function(){
		$(this).ColorPickerSetColor(this.value);
		edited_project_style = true;
	});

	$(".texture_picker").each(function(){
		var texturepicker = $(this);
		var texturepicker_ref = $(this).text()
		$(this).text("");
		$(texturepicker_ref)
			.attr('maxlength','20')
			.attr('size','7')
			.focus(function(){
				texturepicker.show("blind");
			})
			.blur(function(){
				texturepicker.hide("blind")	;
			});
		texturepicker.append("<div class='spacer'>&nbsp;</div>");
		for(t in textures){
			texturepicker.append("<a class='texture_link' title='"+textures[t]+"' id='"+textures[t]+"||"+texturepicker_ref+"'><div class ='texture_display' style='background:#555555 url(/"+top.dj.context.LANGUAGE_CODE+"/"+top.dj.context.project_name+"/css/texture?filename="+textures[t]+"&bg_color="+encodeURIComponent('#555555')+"&percent=100) 50% 50% repeat;'></div></a>");
		};
		texturepicker.append("<div class='spacer'>&nbsp;</div>");
	});
	$(".texture_link").mousedown(function(){
		edited_project_style = true;
		refs = this.id.split('||');
		texture = refs[0];
		ref = refs[1];
		$(ref).val(texture);
	});

	$(".radius_slider").each(function(){
		var radius_slider_ref = $(this).text();
		$(this).text("");
		$(this).slider({
			min: 0,
			max: 25,
			value: parseInt($(radius_slider_ref).val()),
			slide: function(event, ui){
				$(radius_slider_ref).val(ui.value+'px');
			},
		});
		$(this).mouseup(function(){
			edited_project_style = true;
		});
		$(this).blur(function(){
			edited_project_style = true;
		});
		$(radius_slider_ref)
		.val($(this).slider("value")+'px')
		.attr('style',"border:0;font-weight:bold;background:none;color:white;")
		.attr('maxlength','5')
		.attr('size','3');
	});

	$(".shadow_slider").each(function(){
		var shadow_slider_ref = $(this).text();
		$(this).text("");
		$(this).slider({
			min: 0,
			max: 20,
			value: parseInt($(shadow_slider_ref).val()),
			slide: function(event, ui){
				$(shadow_slider_ref).val(ui.value+'px');
			},
		});
		$(this).mouseup(function(){
			edited_project_style = true;
		});
		$(this).blur(function(){
			edited_project_style = true;
		});
		$(shadow_slider_ref)
		.val($(this).slider("value")+'px')
		.attr('style',"border:0;font-weight:bold;background:none;color:white;")
		.attr('maxlength','5')
		.attr('size','3');
	});

	$(".width_slider").each(function(){
		var width_slider_ref = $(this).text();
		$(this).text("");
		$(this).slider({
			min: 0,
			max: 10,
			value: parseInt($(width_slider_ref).val()),
			slide: function(event, ui){
				$(width_slider_ref).val(ui.value+'px');
			},
		});
		$(this).mouseup(function(){
			edited_project_style = true;
		});
		$(this).blur(function(){
			edited_project_style = true;
		});
		$(width_slider_ref)
		.val($(this).slider("value")+'px')
		.attr('style',"border:0;font-weight:bold;background:none;color:white;")
		.attr('maxlength','5')
		.attr('size','3');
	});

	$(".size_slider").each(function(){
		var size_slider_ref = $(this).text();
		$(this).text("");
		$(this).slider({
			range: "max",
			min: 0.5,
			max: 2.5,
			step: 0.1,
			value: parseFloat($(size_slider_ref).val()),
			slide: function(event, ui){
				$(size_slider_ref).val(ui.value+'em');
			},
		});
		$(this).mouseup(function(){
			edited_project_style = true;
		});
		$(size_slider_ref)
		.val($(this).slider("value")+'em')
		.attr('style',"border:0;font-weight:bold;background:none;color:white;")
		.attr('maxlength','5')
		.attr('size','3');
	});

	$(".percent_slider").each(function(){
		var percent_slider_ref = $(this).text();
		$(this).text("");
		$(this).slider({
			range: "max",
			min: 0,
			max: 100,
			step: 1,
			value: parseInt($(percent_slider_ref).val()),
			slide: function(event, ui){
				$(percent_slider_ref).val(ui.value);
			},
		});
		$(this).mouseup(function(){
			edited_project_style = true;
		});
		$(percent_slider_ref)
		.val($(this).slider("value"))
		.attr('style',"border:0;font-weight:bold;color:white;background:none;")
		.attr('maxlength','5')
		.attr('size','3');
	});

//$("#style_accordion").removeClass('ui-helper-hidden');

	$("#save_button")
		.button()
		.removeClass('ui-helper-hidden')
		.click(function(){
		save_project_theme();	
		});

	$("#apply_extra")
		.button()
		.removeClass('ui-helper-hidden')
		.click(function(){
			edited_project_style = true;
		});
	
	$("#inherit_style")
		.button()
		.click(function(){
			top.dj.remote('djity.style.inherit_style',{js_target:top.location});
		});
	
	$("#set_default")
		.button()
		.click(function(){
			top.dj.remote('djity.style.set_default',{js_target:top.location});
		});

	params_textarea = $("#params_list")

	$("#download_params")
		.button()
		.click(function(){
			top.dj.remote('djity.style.download_params',{js_target:params_textarea});
		});

	$("#set_params")
		.button()
		.click(function(){
			top.dj.remote('djity.style.save_project_style',{js_target:top.location,style_values:params_textarea.val()});
		});

};

function save_project_theme(){
	top.dj.remote('djity.style.save_project_style',
		{js_target:top.location,style_values:get_edited_project_style(false)}
	);
	//top.location.reload();
}
