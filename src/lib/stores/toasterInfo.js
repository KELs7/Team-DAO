import { writable} from 'svelte/store';

//export let resultMessage = writable('{"abc":"abchshs", "cdf": "12334"}')
export let errorInfo = writable('')
export let link = writable('')
export let showNotification = writable(false)

