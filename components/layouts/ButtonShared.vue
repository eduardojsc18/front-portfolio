<template>
    <Transition enter-active-class="transition-all duration-300 delay-200 ease-in-out transform-gpu" enter-from-class="opacity-0 translate-x-full" enter-to-class="opacity-100 translate-x-0">
        <button
                v-if="animateButton"
                class="slide-in-right z-50 w-12 h-12 relative grid place-items-center rounded-full bg-palette-100/70 text-palette-900 active:scale-95 transition-all"
                type="button"
                title="Compartilhar meu contato"
        >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
            </svg>
        </button>
    </Transition>
</template>
<script setup>
const animateButton = ref(false)
onMounted(() => {
    setTimeout(() => {
        animateButton.value = true
    }, 1500)
})
</script>
