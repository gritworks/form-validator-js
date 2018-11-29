# form-validator-js
simple form validator js class

Depends on jQuery
from arrtibutes, add attribute to form element:
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
- errors fully set at start.

does not support more forms on one page.
