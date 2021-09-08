<template>
  <TableData :fields="fields" :items="items" class="table-nested" hide-thead>
    <template v-for="(_, slot) of $scopedSlots" #[slot]="scope">
      <slot :name="slot" v-bind="scope" />
    </template>
    <template #cell(note)="{ item }">
      <a href="#" class="d-flex align-center" @click.prevent="$root.$emit('record-edit', item)">
        <span class="flex-fill">{{ item.note }}</span>
        <span class="d-flex flex-center align-self-start text-gray-300 ms-8">
          <svg-icon name="edit-24" width="24" height="24" aria-label="Редактировать" />
        </span>
      </a>
    </template>
  </TableData>
</template>

<script>
export default {
  props: {
    fields: {
      type: Array,
      default() {
        return []
      }
    },
    items: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>
