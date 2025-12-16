<script lang="ts">
	type Props = {
		size: number
		is_user_turn: boolean
		divide_at: (a: number) => void
	}

	let { size, is_user_turn, divide_at }: Props = $props()
</script>

<div class="heap" class:playable={is_user_turn}>
	{#each { length: size } as _, index}
		<button
			class="piece"
			aria-label="divide heap of size {size} at {index + 1}"
			disabled={!is_user_turn || index + 1 === size || index + 1 == size / 2}
			onclick={() => divide_at(index + 1)}
		>
			<span class="circle"></span>
		</button>
	{/each}
</div>

<style>
	.heap {
		display: flex;
		flex-wrap: wrap;
		background-color: var(--secondary-bg-color);
		padding: 0.25rem;
		border-radius: 1rem;
		border: 1px solid var(--heap-outline-color);
	}

	.piece {
		width: 2rem;
		height: 2rem;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.circle {
		width: 70%;
		height: 70%;
		background-color: var(--piece-color);
		border-radius: 50%;
		border: 1px solid var(--piece-outline-color);
	}

	.heap.playable .piece:not(:last-child) {
		&:has(~ :hover),
		&:hover {
			.circle {
				background-color: var(--main-color);
			}
		}
	}
</style>
