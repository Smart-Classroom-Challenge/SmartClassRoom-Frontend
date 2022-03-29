<template>
  <div class="px-10 text-center">
    <Suspense>
      <PageView />
      <template #fallback>
        <div class="italic opacity-50">
          <span class="pulse">Loading...</span>
        </div>
      </template>
    </Suspense>
  </div>
</template>
