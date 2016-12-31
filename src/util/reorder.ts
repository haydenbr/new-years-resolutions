import { reorderArray } from 'ionic-angular';

export function reorder(array: any[], index: { from: number, to: number }) {
	return reorderArray(array.slice(0), index);
}