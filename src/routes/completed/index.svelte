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
</style>
