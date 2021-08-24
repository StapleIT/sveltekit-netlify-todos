<script context="module">
	export const prerender = true;
	export async function load({fetch}){
		const res = await fetch('/todos')
		const jsonRes = await res.json()
		return {props: {todos: jsonRes.todos}}
	}
</script>

<script>
	let text = "";
	export let todos
	async function addTodo(){
		try {
			const todo = {
				text,
				completed:false
			}
			await fetch('/todos', {
				method: "POST",
				body: JSON.stringify(todo)
			})
			text = ""
			fetchTodos();
		}catch (err){
			alert(`there was an error: ${err}`)
			text = ""

		}
	}
	async function completeTodo(todo){
		try {
           await fetch('/todos',{
			   method: 'PUT',
			   body: JSON.stringify(todo)
		   })
		   fetchTodos();
		} catch(err) {
            alert(`there was an error: ${err}`)
			text = ""

		}
	}
	async function fetchTodos(){
		try {
           const res = await fetch('/todos')
		   const jsonRes = await res.json()
		   todos = jsonRes.todos
		} catch(err) {
            alert(`there was an error: ${err}`)
		}
	}
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<section>
	<h1>
		My TODO List App
	</h1>
	<div>
		<input type="text" placeholder="enter todo" bind:value={text}>
		<button on:click={addTodo}>Add Todo</button>
    </div>
	<br>
	<ul>
		{#each todos as todo}
		    <li type="none"><input type="checkbox" bind:checked={todo.completed} on:change={completeTodo(todo)}>  {todo.text}</li>
		{/each}
	</ul>
	
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 1;
	}

	h1 {
		width: 100%;
	}

	.welcome {
		position: relative;
		width: 100%;
		height: 0;
		padding: 0 0 calc(100% * 495 / 2048) 0;
	}

	.welcome img {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		display: block;
	}
</style>
