<script lang="ts">
	import { MAX_HEAPSIZE } from '../config'
	import { send_toast } from './Toast.svelte'

	type Props = {
		show_dead_heaps: boolean
		user_turns_first: boolean
		current_heapsize: number
		is_computer_game: boolean
		restart: () => void
		toggle_computer_game: () => void
	}

	let {
		show_dead_heaps = $bindable(),
		user_turns_first = $bindable(),
		current_heapsize = $bindable(),
		is_computer_game,
		restart,
		toggle_computer_game,
	}: Props = $props()

	let size = $derived(current_heapsize)

	function change_size() {
		if (size >= 0 && Number.isInteger(size) && size <= MAX_HEAPSIZE) {
			current_heapsize = size
		} else {
			send_toast({
				variant: 'error',
				title: `Size must be a positive integer less than ${MAX_HEAPSIZE}.`,
			})
		}
	}
</script>

<menu>
	<div class="first_row">
		<label>
			<span>Initial heap size</span>
			<input
				class="input"
				type="number"
				min="1"
				max={MAX_HEAPSIZE}
				step="1"
				bind:value={size}
				onchange={change_size}
			/>
		</label>

		<div class="buttons">
			<button class="button" onclick={restart}>Restart</button>
			<button class="button" onclick={toggle_computer_game}>
				{#if is_computer_game}
					Play Solo
				{:else}
					Play vs Computer
				{/if}
			</button>
		</div>
	</div>

	<div class="checks">
		<label>
			Show dead heaps
			<input type="checkbox" bind:checked={show_dead_heaps} />
		</label>

		{#if is_computer_game}
			<label>
				You turn first
				<input type="checkbox" bind:checked={user_turns_first} />
			</label>
		{/if}
	</div>
</menu>

<style>
	menu {
		margin-block: 1rem;
		display: grid;
		gap: 1rem;
	}

	input[type='number'] {
		width: 7ch;
	}

	.first_row {
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		gap: 1rem;
	}

	.buttons {
		display: flex;
		gap: 0.5rem;
	}

	.checks {
		display: flex;
		justify-content: space-between;
	}
</style>
