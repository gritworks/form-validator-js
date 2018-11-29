/*
Depends on jQuery
from arrtibutes:
- data-fv-form

ui attributes:
input:
- data-fv-validate
- data-fv-error-out="#elementid"
- type: text, email, password
textArea:
- data-fv-validate
- data-fv-error-out="#elementid"

* animation
- addding class "show" to data-fv-error-out element class for animating with css
- errors fully set at page definition.

*/
class FormValidator {

	constructor($){
		window.$=$

		this.olist=[];
		this.testedOnce=false;

		$(document).ready(()=>{
			this.init();
		});

	}

	init(){
			// init form
			this.form=$('form[data-fv-form]');
		
			this.form.submit((event)=>{
				this.testedOnce=true;
				
				if(!this.checkAllFields())
				{
					event.preventDefault();
				}
			})

			// init fields
			$('[data-fv-validate]').each((index,element)=>{
				// store elements in array
				var o={
					element:element,
					type:$(element).attr('type'),
					tagName:element.tagName,
					errorOut:$(element).attr('data-fv-error-out'),
					errorMessage:$(element).attr('data-fv-error-message'),
					listener:false
				}
				// set error in dom element
				$(o.errorOut).html(o.errorMessage);

				this.olist.push(o);

			})
	}

	// check all fields on form submit
	checkAllFields(){
		// run check on all fields till find error
		var len=this.olist.length;
		for(var i=0;i<len;i++){
			var o=this.olist[i];

			// present only error for first field we run into
			if(!this.test_field(o)){return false;break;}

		}

		return true;	
		
	}

	// test field with specific tag and type
	test_field(o){
		
		var field=o.tagName+":"+o.type;
		switch(field){
			case "INPUT:text":
				this.addInputListener(o);
				if(this.is_field_empty(o)){return false;break;}
			break;
			case "INPUT:email":
				this.addInputListener(o);
				if(this.is_not_field_email(o)){return false;break;}
				if(this.is_field_empty(o)){return false;break;}
			break;
			case "INPUT:password":
				this.addInputListener(o);
				if(this.is_field_empty(o)){return false;break;}
			break;
			case "TEXTAREA:text":
				this.addInputListener(o);
				if(this.is_field_empty(o)){return false;break;}
			break;
		}
		


		// no problems found
		return true;
	}

	addInputListener(o){
		if(o.listener==false){
			$(o.element).on('input',(event)=>{
				this.test_field(o);	
			});
			o.listener=true;
		}
	}

	// field helpers
	is_field_empty(o){
		if(!this.testedOnce){return false;}

		var val=$(o.element).val();
		if(val==""){
			// lets add show to error out container
			$(o.errorOut).addClass('show')
			return true;
		}
		$(o.errorOut).removeClass('show')
		return false;
		
	}

	is_not_field_email(o){
		if(!this.testedOnce){return false;}

		var val=$(o.element).val()
        var regex = /(.+)@(.+){2,}\.(.+){2,}/;
        var result=!regex.test(val);
        if(result){
        	$(o.errorOut).addClass('show')
        	return result;
        }
        $(o.errorOut).removeClass('show')
        return result;
	}





}


var f= new FormValidator(jQuery);