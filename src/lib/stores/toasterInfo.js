import { writable} from 'svelte/store';

export let resultMessage = writable('')
export let errorInfo = writable('')
export let link = writable('')
export let showNotification = writable(false)

