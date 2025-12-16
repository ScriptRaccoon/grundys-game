<script lang="ts">
	import Game from './components/Game.svelte'
	import Header from './components/Header.svelte'
	import Menu from './components/Menu.svelte'
	import Status from './components/Status.svelte'
	import Toast, { send_toast } from './components/Toast.svelte'
	import { get_computer_move } from './computer'
	import { INITIAL_HEAPSIZE } from './config'

	let current_heapsize = $state(INITIAL_HEAPSIZE)
	let heapsizes = $state([INITIAL_HEAPSIZE])

	let is_computer_game = $state(false)
	let is_user_turn = $state(true)
	let user_turns_first = $state(true)
	let show_dead_heaps = $state(true)

	let game_over = $derived(heapsizes.every((size) => size <= 2))

	function restart() {
		heapsizes = [current_heapsize]

		if (is_computer_game) {
			is_user_turn = user_turns_first
			if (!is_user_turn) make_computer_move()
		} else {
			is_user_turn = true
		}
	}

	function toggle_computer_game() {
		is_computer_game = !is_computer_game
		restart()
	}

	function divide_heap(heap_index: number, a: number, is_user: boolean) {
		if (is_user && !is_user_turn) return
		const size = heapsizes[heap_index]
		if (a === 0 || a === size || 2 * a === size) return
		heapsizes = [
			...heapsizes.slice(0, heap_index),
			a,
			size - a,
			...heapsizes.slice(heap_index + 1),
		]

		if (is_computer_game) {
			is_user_turn = !is_user_turn
			if (!is_user_turn && !game_over) make_computer_move()
		}

		if (game_over) {
			handle_gameover()
		}
	}

	function handle_gameover() {
		if (is_computer_game) {
			if (is_user_turn) {
				send_toast({
					variant: 'error',
					title: 'Gameover. You lost.',
				})
			} else {
				send_toast({
					variant: 'success',
					title: 'Game has finished. You won!',
				})
			}
		} else {
			send_toast({
				variant: 'success',
				title: 'Game has finished.',
			})
		}
	}

	function make_computer_move() {
		const move = get_computer_move(heapsizes)
		if (move === null) return
		setTimeout(() => {
			divide_heap(...move, false)
		}, 1000)
	}
</script>

<Header />

<div class="container">
	<Menu
		bind:show_dead_heaps
		bind:user_turns_first
		bind:current_heapsize
		{is_computer_game}
		{restart}
		{toggle_computer_game}
	/>

	<Status {is_computer_game} {is_user_turn} {game_over} />

	<Game bind:heapsizes {show_dead_heaps} {is_user_turn} {divide_heap} />
</div>

<Toast position="bottom-center" />

<style>
	.container {
		max-width: 600px;
		margin: 0 auto;
		padding-inline: 0.75rem;
		margin-bottom: 2rem;
	}
</style>
