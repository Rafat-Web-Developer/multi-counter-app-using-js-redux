
// get html elements using id
const ADD_NEW_BTN_ELEMENT = document.getElementById("addNewElement");
const RESET_ALL_BTN_ELEMENT = document.getElementById("resetAll");
const ALL_COUNTERS_ELEMENT = document.getElementById("allCounters");

// action initialization
const INCREMENT = "increment";
const DECREMENT = "decrement";
const RESET = "reset";
const ADDNEWCOUNTER = "addnewcounter";

// common functions
const getId = (state) => {
	for (let i = 1; i <= state.length; i++) {
		document.getElementById(`incrementBtn${i}`).addEventListener("click", () => {
			STORE.dispatch(incrementCounterValue(i));
		});

		document.getElementById(`decrementBtn${i}`).addEventListener("click", () => {
			STORE.dispatch(decrementCounterValue(i));
		});
  }
}


const createElement = (currentState) => {
	while (ALL_COUNTERS_ELEMENT.hasChildNodes()) {
	    ALL_COUNTERS_ELEMENT.removeChild(ALL_COUNTERS_ELEMENT.firstChild);
	  }
	currentState.map(({id, value}) => {
		var newTag = document.createElement("div");
		newTag.classList.add('max-w-md', 'mx-auto', 'mt-10', 'space-y-5');
		newTag.innerHTML = `<div
                    class="drop-shadow-lg p-4 h-auto flex flex-col items-center justify-center space-y-5 bg-white rounded shadow"
                >
                    <div class="text-2xl font-bold" id="counterResult${id}"></div>
                    <div class="flex space-x-3">
                        <button
                            class="bg-green-400 font-bold text-white px-3 py-2 rounded shadow" id='incrementBtn${id}'
                        >
                            Increment
                        </button>
                        <button
                            class="bg-purple-400 font-bold text-white px-3 py-2 rounded shadow" id="decrementBtn${id}"
                        >
                            Decrement
                        </button>
                    </div>
                </div>`;
		ALL_COUNTERS_ELEMENT.appendChild(newTag);
	});

getId(currentState);
}

// inital state
let INITIALSTATE = [
	{
		id: 1,
		value: 0
	}
];

// action creator
const incrementCounterValue = (id) => {
	return {
		type: INCREMENT,
		payload: id
	}
};
const decrementCounterValue = (id) => {
	return {
		type: DECREMENT,
		payload: id
	}
};
const addNewCounter = (data) => {
	return {
		type: ADDNEWCOUNTER,
		payload: data
	}
};
const resetAll = (id) => {
	return {
		type: RESET,
	}
};

// reducer
const counterReducer = (state = INITIALSTATE, action) => {
	switch(action.type){
		case (INCREMENT):
			return state.map((counter) => {
				if(counter.id === action.payload){
					return {
						...counter,
						value: counter.value + action.payload
					};
				}
				return {...counter};
			});

		case (DECREMENT):
			return state.map((counter) => {
				if(counter.id === action.payload){
					return {
						...counter,
						value: counter.value - action.payload
					};
				}
				return {...counter};
			});

		case (RESET):
			return state.map((counter) => {
				return {
						...counter,
						value: 0
					};
			});

		case (ADDNEWCOUNTER):
			return [...state, action.payload];

		default:
			return state;
	}
};

// create store
const STORE = Redux.createStore(counterReducer);

// render method for interect with ui
const render = () => {
	const currentCounterStateValue = STORE.getState();

	createElement(currentCounterStateValue);

	currentCounterStateValue.map(({id, value}) => {
		document.getElementById(`counterResult${id}`).innerText = value.toString();
	});
}
render();

// subscriber
STORE.subscribe(render);

ADD_NEW_BTN_ELEMENT.addEventListener("click", () => {
	const counterLength = INITIALSTATE.length;
	let data = {
		id: counterLength + 1,
		value: 0
	}
	INITIALSTATE.push(data);
	STORE.dispatch(addNewCounter(data));
})

RESET_ALL_BTN_ELEMENT.addEventListener("click", () => {
	STORE.dispatch(resetAll());
})
STORE.dispatch(resetAll());