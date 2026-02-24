1) What is the difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll?

Ans: getElementById("id") selects a single element by its unique ID. getElementsByClassName("class") selects all elements with that class and returns an HTMLCollection. querySelector("selector") selects the first element matching a CSS selector, while querySelectorAll("selector") selects all matching elements and returns a NodeList.

2) How do you create and insert a new element into the DOM?

Ans: Use document.createElement to make a new element, then insert it with appendChild.

     Example:
	 
	let div = document.createElement("div");
	div.innerText = "Hello";
	document.body.appendChild(div);
	

3) What is Event Bubbling? And how does it work?

Ans: Event Bubbling is when an event starts at the deepest target element and bubbles up to its ancestors. For example, clicking a button inside a div triggers the button’s click first, then the div’s click.


4) What is Event Delegation in JavaScript? Why is it useful?

Ans: Event Delegation attaches a single listener to a parent element to handle events on its child elements. It reduces memory usage and works for dynamically added elements.

	 Example:
	 
		parent.addEventListener("click", e => {
		 if(e.target.classList.contains("child-btn")) {
		  console.log("Child clicked");
			  }
			});
				

5) What is the difference between preventDefault() and stopPropagation() methods?
   

Ans: preventDefault() stops the default browser action (like form submission or link navigation). stopPropagation() stops the event from bubbling or capturing to parent elements.
