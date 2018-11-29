/*
The MIT License

Copyright (c) Wouter Visser

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
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