<script lang="ts">
	type Props = {
		is_computer_game: boolean
		is_user_turn: boolean
		game_over: boolean
	}

	let { is_computer_game, is_user_turn, game_over }: Props = $props()
</script>

<div aria-live="polite">
	<strong>Status:</strong>
	{#if is_computer_game}
		{#if is_user_turn}
			{#if game_over}
				Gameover. You lost.
			{:else}
				It is your turn against the computer.
			{/if}
		{:else if game_over}
			Game has finished. You won!
		{:else}
			Computer is thinking ...
		{/if}
	{:else if game_over}
		Game has finished.
	{:else}
		You are playing alone.
	{/if}
</div>
