<script lang="ts">
	import Heap from './Heap.svelte'

	type Props = {
		heapsizes: number[]
		show_dead_heaps: boolean
		is_user_turn: boolean
		divide_heap: (i: number, a: number, is_user: boolean) => void
	}

	let {
		heapsizes = $bindable(),
		show_dead_heaps,
		divide_heap,
		is_user_turn,
	}: Props = $props()
</script>

<div class="game">
	{#each heapsizes as size, heap_index}
		{#if show_dead_heaps || size > 2}
			<Heap
				{size}
				{is_user_turn}
				divide_at={(a) => divide_heap(heap_index, a, true)}
			/>
		{/if}
	{/each}
</div>

<style>
	.game {
		margin-top: 1.25rem;
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
	}
</style>
