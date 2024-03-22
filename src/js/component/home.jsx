import { stringify } from "query-string";
import React,{ useState , useEffect } from "react";

//include images into your bundle




//create your first component
const Home = () => {
	const [newTask,setNewTask]= useState("")
	const [tasks,setTasks] = useState([""])
	


	function addTask(e) {
		if (e.key === "Enter") {
			const newList = (tasks.concat({"label": newTask , "done": false}));
			setNewTask("");
			reloadTasks(newList);
		}
	}

	function deleteTask(index){
		const filteredTasks = tasks.filter((i) => i !== index);

		if (filteredTasks.length === 0){
			deleteUser();
		}else{
			reloadTasks(filteredTasks)
		}
	}


	const arrTasks = tasks.map((task,index)=> <li key={index} className="justify-content-left">{task.label}<span className="text-danger fw-bold" onClick={()=>deleteTask(task)}> X</span></li>)

	let number = tasks.length

	let txt = "task"
	if (number >= 2) {
		txt = "tasks"
	}

	function createUser() {
		fetch ('https://playground.4geeks.com/apis/fake/todos/user/DavidPadilla', {
			method: "POST",
			body: JSON.stringify([]),
			headers: {
				"content-type": "application/json"
			}
		})
		.then((response)=>{

			response.json()})
		.then((data)=>{
			getToDoList()})
		.catch((error)=>{
			console.log(error)}
		)
	};

	function getToDoList() {
		fetch ('https://playground.4geeks.com/apis/fake/todos/user/DavidPadilla', {
			method: "GET",
		})
		.then((response)=> {

			if (response.status === 404) {
				createUser()
			}
			return response.json()
		})
		.then((data)=>{
			setTasks(data)})
		.catch((error)=>{
			console.log(error)}
		)
	};

	function reloadTasks(newList) {

		fetch ('https://playground.4geeks.com/apis/fake/todos/user/DavidPadilla', {
			method: "PUT",
			body: JSON.stringify(newList),
			headers: {
				"content-type": "application/json"
			}
		})
		.then((response)=>{
			response.json()})
		.then((data)=>{
			getToDoList()})
		.catch((error)=>{
			console.log(error)}
		)
	};

	function deleteUser() {
		fetch ('https://playground.4geeks.com/apis/fake/todos/user/DavidPadilla', {
			method: "DELETE",
			headers: {
				"content-type": "application/json"
			}
		})
		.then((response)=>{
			response.json();})
		.then((data)=>{
			createUser()})
		.catch((error)=>{
			console.log(error)}
		)

	};

	useEffect(()=>{
		getToDoList()
	},[])

	return (
	<>
		<div className="container-fluid col-6 bg-white">
			<h1 className="text-center mt-5">My ToDo List</h1>
			<ul>
				<li><input type="text" className="form-control"  onChange={e=>setNewTask(e.target.value)} onKeyDown={addTask} value={newTask} placeholder="What needs to be done?"/></li>
				{arrTasks}
				<li className="d-flex"><div className="text-danger fw-bold px-2">{number}</div>{txt} to do.</li>
			</ul>

		</div>
	</>
	);
};

export default Home;
