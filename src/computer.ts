import { MAX_HEAPSIZE } from './config'

function compute_grundys(limit: number): number[] {
	const grundys: number[] = []

	for (let n = 0; n <= limit; n++) {
		const s = new Set<number>()
		for (let a = 1; a < n / 2; a++) {
			s.add(grundys[a] ^ grundys[n - a])
		}
		let mex = 0
		while (s.has(mex)) mex++
		grundys[n] = mex
	}

	return grundys
}

const grundys = compute_grundys(MAX_HEAPSIZE)

export function get_computer_move(heapsizes: number[]): [number, number] | null {
	const winning_moves: [number, number][] = []
	const all_moves: [number, number][] = []

	const grundy_value = heapsizes.reduce((prev, curr) => prev ^ grundys[curr], 0)

	for (let i = 0; i < heapsizes.length; i++) {
		const n = heapsizes[i]
		for (let a = 1; a < n / 2; a++) {
			all_moves.push([i, a])
			const move_value = grundy_value ^ grundys[n] ^ grundys[a] ^ grundys[n - a]
			if (move_value === 0) winning_moves.push([i, a])
		}
	}

	if (all_moves.length === 0) return null
	if (winning_moves.length === 0) return get_random_element(all_moves)
	return get_random_element(winning_moves)
}

function get_random_element<T>(arr: T[]): T {
	const index = Math.floor(Math.random() * arr.length)
	return arr[index]
}
