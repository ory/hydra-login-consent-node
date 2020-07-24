/**
 * Password Validator
 * Author: Brian Nippert, Alok Gupta
 * Date: 29/July/2018
 * Version 1.4
 */

//Count variable used for progress bar
var count = 0;

var PasswordValidator = new function () {
    this.minSize = 5;
    this.maxSize = 15;
    this.lengthConfigured = true;
    this.uppercaseConfigured = true;
    this.digitConfigured = true;
    this.specialConfigured = true;
    this.prohibitedConfigured = true;

    this.specialCharacters = ['_', '#', '%', '*', '@'];
    this.prohibitedCharacters = ['$', '&', '=', '!'];

    this.elementnumber = 0;
    this.setup = function (passwordField, verifyField) {
        console.log(passwordField);
        this.elementnumber++;
        var passwordFieldEle= $('#'+passwordField);
        this.addPasswordField(passwordFieldEle);
        if(verifyField !== undefined)
        {
            var verifyFieldEle= $('#'+verifyField);
            this.addVerifyField(verifyFieldEle,$(passwordFieldEle).attr('id'));
        }
        // Lars Andersson 2020-07-22: Adding this line to get it to work with bootstrap cards
        $('[data-toggle="popover"]').popover();
    }

    this.addPasswordField = function (passwordElement) {
        num = this.elementnumber;
        //Set Popover Attributes
        $(passwordElement).attr("data-placement", "right");
        // Lars Andersson 2020-07-22: Commenting out this line to get it to work with bootstrap cards
        //$(passwordElement).attr("data-toggle", "popover");
        $(passwordElement).attr("data-trigger", "focus");
        $(passwordElement).attr("data-html", "true");
        $(passwordElement).attr("title", "Password Requirements");
        $(passwordElement).attr("onfocus", "PasswordValidator.onFocus(this," + num + ")");
        $(passwordElement).attr("onblur", "PasswordValidator.onBlur(this," + num + ")");
        $(passwordElement).attr("onkeyup", "PasswordValidator.checkPassword(this," + num + ")");

        //Create progress bar container
        var progressBardiv = document.createElement("div");

        progressBardiv.id = "progress" + num;
        $(progressBardiv).addClass("progress");

        //Progress bar element
        var progressBar = document.createElement("div");
        $(progressBar).addClass("progress-bar");
        $(progressBar).addClass("bg-info");
        progressBar.id = "progressBar" + num;
        $(progressBar).attr("role", "progressbar");
        $(progressBar).attr("aria-valuenow", "0");// was 100
        $(progressBar).attr("aria-valuemin", "0");
        $(progressBar).attr("aria-valuemax", "100");
        $(progressBar).css("width", "0%");
        $(progressBardiv).append(progressBar);

        //Add popover data including the progress bar
        $(passwordElement).attr("data-content", '&bull; Between 10-12 Characters <br/>&bull; An upper Case Letter<br/> &bull; A Number<br/> &bull; At Least 1 of the Following (_,-,#,%,*,+)<br/> &bull; None of the Following ($,&,=,!,@) <br/>' + progressBardiv.outerHTML);
    }

    //TODO: Add validation to check the repeat password field
    this.addVerifyField = function (verifyElement, passwordElementID) {
        $(verifyElement).attr("data-placement", "right");
        // Lars Andersson 2020-07-22: Commenting out this line to get it to work with bootstrap cards
        //$(verifyElement).attr("data-toggle", "popover");
        $(verifyElement).attr("data-trigger", "focus");
        $(verifyElement).attr("data-content", "Passwords Do Not Match!");
        $(verifyElement).attr("data-html", "true");
        $(verifyElement).attr("onfocus", "PasswordValidator.checkVerify(this,'" + passwordElementID + "')");
        $(verifyElement).attr("onkeyup", "PasswordValidator.checkVerify(this,'" + passwordElementID + "')");
    }

    this.checkVerify = function (verifyElement, passwordElementID) {
        if (verifyElement.value == $('#' + passwordElementID).val()) {
            $(verifyElement).popover('hide');
            $(verifyElement).addClass("has-success");
            // Lars Andersson 2020-07-22: Added return statement
            return true;
        } else {
            $(verifyElement).popover('show');
            $(verifyElement).removeClass("has-success");
            var popover = $(verifyElement).attr("data-content", 'Passwords Do Not Match!');
            // Lars Andersson 2020-07-22: Commented out this line as it causes an exception
            //popover.setContent();
            // Lars Andersson 2020-07-22: Added return statement
            return false;
        }
    }

    this.checkPassword = function (e, num) {
        // var id = e.id;
        // var num = id.match(/\d/g);
        // num = num.join("");
        count = 0;
        var percent = 0.0;
        var password = e.value;

        var length = this.lengthConfigured ? this.checkLength(password) : '';
        var upper = this.uppercaseConfigured ? this.checkUpperCase(password) : '';
        var digit = this.digitConfigured ? this.checkDigit(password) : '';
        var special = this.specialConfigured ? this.checkSpecialCharacters(password) : '';
        var prohibited = this.prohibitedConfigured ? this.checkProhibitedCharacter(password) : '';
        if (length.length + upper.length + digit.length + special.length + prohibited.length == 0) {
            $(e).popover('hide');
            // Lars Andersson 2020-07-22: Commented out this line
            //$(e).addClass("is-invalid");
            return true;
        } else {
            $(e).popover('show');
            // Lars Andersson 2020-07-22: Commented out this line
            //$(e).removeClass("is-valid");
            // Lars Andersson 2020-07-22: Added this line to calculate progress
            percent = calculatePercent(length, upper, digit, special);
            // Lars Andersson 2020-07-22: Commented out this line
            //setProgressBar(count, e, num);
            var popover = $(e).attr("data-content", length + upper + digit + special + prohibited + ' <br/>' + document.getElementById("progress" + num).outerHTML).data('bs.popover');
            // Lars Andersson 2020-07-22: Commented out this line as it causes an exception
            popover.setContent();
            // Lars Andersson 2020-07-22: Added this line to display progress
            setProgressBar(percent, e, num);
            return false;
        }
    }

    /**
     * Checks to see if the password contains an approved special character
     * @param string password to test
     * @returns {string} string to add to the popover
     */
    this.checkSpecialCharacters = function (string) {
        // var specialChar = new RegExp("[_\\-#%*\\+]");
        var specialChar = new RegExp("[" + this.specialCharacters.join('') + "]");
      
        if (specialChar.test(string) == false) {
            return addPopoutLine("At Least 1 of the Following (" + this.specialCharacters.join(',') + ")");
        }
        else {
            count++;
            return "";
        }
    }

    /**
     * Checks to see if any prohibited special characters are present in the password.
     * @param string passwor dot test
     * @returns {string} string to add to the popover
     */
    this.checkProhibitedCharacter = function (string) {
        // var specialChar = new RegExp("[$&=!@]");//= /[$&=!@]/;
        var specialChar = new RegExp("[" + this.prohibitedCharacters.join('') + "]");

        if (specialChar.test(string) == true) {
            return addPopoutLine("None of the Following (" + this.prohibitedCharacters.join(',') + ")");
        }
        else {
            count++;
            return "";
        }
    }

    /**
     * Checks to see if there is at least 1 digit in the password
     * @param string password to test
     * @returns {string} string to add to the popover
     */
    this.checkDigit = function checkDigit(string) {
        var hasNumber = /\d/;
        if (hasNumber.test(string) == false) {
            return addPopoutLine("A Number");
        }
        else {
            count++;
            return "";
        }
    }

    /**
     * Checks to ensure at least 1 character is upper case
     * @param string password to test
     * @returns {string} string to add to the popover
     */
    this.checkUpperCase = function (string) {
        if (string.replace(/[^A-Z]/g, "").length == 0) {
            return addPopoutLine("An Upper Case Letter");
        }
        else {
            count++;
            return "";
        }
    }

    /**
     * Checks the length of the password
     * @param string password to test
     * @returns {string} string to add to the popover
     */
    this.checkLength = function (string) {
        if (string.length > this.maxSize || string.length < this.minSize) {
            return addPopoutLine("Between " + this.minSize + "-" + this.maxSize + " Characters");
        }
        else {
            count++;
            return "";
        }

    }
    
    /**
     * Lars Andersson 2020-07-22: Simple function to calculate progress
     * 
     * @returns {number} progress in percent
     */
    function calculatePercent(length, upper, digit, special) {
        var percent = 0.0;
      
        // Check length of password
        if (length == "") {
            percent = 25.0;
        }
        
        // Check upper
        if (upper == "") {
            percent += 25.0;
        }
   
        // Check digit
        if (digit == "") {
          percent += 25.0;
        }
        
        // Check special character
        if (special == "") {
          percent += 25.0;
        }
        return percent;
    }

    /**
     * sets the progress bar (e) to the percent
     * @param percent percent to set progress bar to
     * @param e  password field element
     */
    function setProgressBar(percent, e, num) {
        // Lars Andersson 2020-07-22: Commented out two lines below and added aria-valuenow
        //percentNum = (percent / 5) * 100;
        //percent = percentNum.toString() + "%";
        $("#progressBar" + num).attr("aria-valuenow", percent);
        $("#progressBar" + num).css("width", percent.toString() + "%");
    }

    /**
     * returns string that is formatted with a bullet point and <br> at the end for the popover.
     * @param string popover text
     * @returns {string} formatted popover string
     */
    function addPopoutLine(string) {
        return "&bull;" + string + "<br/>";
    }

    /**
     * On focus event that checks the password when the focus is gained.
     * @param e password element
     */
    this.onFocus = function (e, num) {
        this.checkPassword(e, num);
    }

    this.onBlur = function (e, num) {
        if (this.checkPassword(e, num) == false) {
        }
    }
}


