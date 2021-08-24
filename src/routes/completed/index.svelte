<script context="module">
	export async function load({fetch}){
		const res = await fetch('/todos?completed=true')
		const jsonRes = await res.json()
		return {props: {todos: jsonRes.todos}}
	}
</script>

<script>
    export let todos
</script>

<svelte:head>
	<title>Completed</title>
</svelte:head>

<section>
	<h1>
		Completed TODOs
	</h1>
    <ul>
        {#each todos as todo}
          <li type="none">
              <input type="checkbox" bind:checked={todo.completed} disabled> {todo.text}
          </li>
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
