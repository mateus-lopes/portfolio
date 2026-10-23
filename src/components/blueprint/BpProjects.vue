<script setup lang="ts">
import { academicProjects, personalProjects } from '../../data/profile'
import { useProfileLocale } from '../../composables/useProfileLocale'

const { pick } = useProfileLocale()

const number = (index: number) => String(index + 1).padStart(2, '0')
</script>

<template>
  <section id="projetos" class="projects">
    <div class="bp-section-head">
      <span class="bp-label">{{ $t('projects.label') }}</span>
      <h2 class="bp-section-title">{{ $t('projects.title') }}</h2>
    </div>

    <div class="groups">
      <div class="bp-box group">
        <h3 class="bp-label group-title">{{ $t('projects.personal') }}</h3>
        <a v-for="(project, i) in personalProjects" :key="project.url" :href="project.url" class="item">
          <span class="bp-label bp-label--mute">{{ number(i) }}</span>
          <span class="text">
            <strong>{{ project.name }}</strong>
            <span>{{ pick(project.desc) }}</span>
          </span>
          <span class="arrow" aria-hidden="true">→</span>
        </a>
      </div>

      <div class="bp-box group">
        <h3 class="bp-label group-title">{{ $t('projects.academic') }}</h3>
        <a v-for="(project, i) in academicProjects" :key="project.url" :href="project.url" class="item">
          <span class="bp-label bp-label--mute">{{ number(i + personalProjects.length) }}</span>
          <span class="text">
            <strong>{{ project.name }}</strong>
            <span>{{ pick(project.desc) }}</span>
          </span>
          <span class="arrow" aria-hidden="true">→</span>
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.projects {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.groups {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.group {
  flex: 1 1 480px;
  padding: 8px 0;
}

.group-title {
  display: block;
  padding: 14px 20px;
}

.item {
  display: flex;
  align-items: baseline;
  gap: 16px;
  padding: 14px 20px;
  border-top: 1px solid var(--bp-line-soft);
  text-decoration: none;
  transition: background 0.2s ease;
}

.item:hover {
  background: rgba(92, 200, 255, 0.08);
}

.text {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.text strong {
  font-weight: 600;
  color: var(--bp-ink);
}

.text span {
  font-size: 14px;
  color: var(--bp-text);
}

.arrow {
  color: var(--bp-cyan);
  transition: transform 0.2s ease;
}

.item:hover .arrow {
  transform: translateX(4px);
}
</style>
