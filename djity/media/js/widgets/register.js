dj.widgets.register = 
{
	/*
	 * Djty user's register
	 */

	
	init : function(register_button)
	{
	/*
	 * Register Dialog
	 */
	    
		this.js_target = 'dj.widgets.register';
		//init button
		this.button = register_button
				.click(function()
				{
					dj.widgets.register.open();
				});
		
		
		//init dialog
		this.dialog = $('<div id="register_dialog" class="ui-helper-hidden" title="' + gettext('Create an account') +'"></div>')
			.keyup(function(e)
			{
				
				if( e.keyCode == 13){ self.element.register('validate')};
			})
			.dialog(
			{
				autoOpen:false,
				modal: true,
				show:'blind',
				buttons : {
					OK : function()
						{
							dj.widgets.register.validate();
						},
					Cancel : function()
						{
							dj.widgets.register.close();
						},
				},
			});


	},

	validate : function()
	{
		dj.remote('djity.portal.register',
			{
				'js_target':'dj.widgets.register',
				'username': $('#id_username').val(),
				'email': $('#id_email').val(),
				'password1': $('#id_password1').val(),
				'password2': $('#id_password2').val(),
			});

	},

	open : function()
	{

		dj.remote('djity.portal.get_register',{'js_target':'dj.widgets.register'});
	
		this.dialog.dialog('open');
		
	},

	set_form : function(form_html)
	{


		this.dialog
			.html(form_html)
			.dialog("option","width","auto")
			.dialog("option","height","auto")
			.dialog("option","position","center")
			.find("form").form();
	},

	close : function(){
			

		this.dialog.dialog('close');
	},


};

