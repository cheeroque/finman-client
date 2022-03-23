<template>
  <div class="card card-widget">
    <div class="card-header">
      <h5 class="card-title">Категории</h5>
    </div>
    <CardCategorySimple
      v-for="(category, index) in categories"
      :key="`category-${category.id}`"
      :category="category"
      :class="{ 'mb-8': index < categories.length - 1 }"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      categories: [
        {
          id: 1,
          name: 'Продукты',
          slug: 'groceries',
          is_income: 0,
          created_at: '2021-04-07T11:05:37.000000Z',
          updated_at: '2022-03-03T13:51:38.000000Z',
          color: '#cb1245',
        },
        {
          id: 2,
          name: 'Хозтовары',
          slug: 'household',
          is_income: 0,
          created_at: '2021-04-07T11:05:37.000000Z',
          updated_at: '2021-10-17T11:13:16.000000Z',
          color: '#004080',
        },
        {
          id: 3,
          name: 'Обед',
          slug: 'lunch',
          is_income: 0,
          created_at: '2021-04-07T11:05:49.000000Z',
          updated_at: '2021-10-17T11:13:22.000000Z',
          color: '#ff0080',
        },
        {
          id: 4,
          name: 'Транспорт',
          slug: 'transportation',
          is_income: 0,
          created_at: '2021-04-07T11:05:37.000000Z',
          updated_at: '2021-10-17T11:13:28.000000Z',
          color: '#008080',
        },
        {
          id: 5,
          name: 'Связь',
          slug: 'communication',
          is_income: 0,
          created_at: '2021-04-07T11:05:37.000000Z',
          updated_at: '2021-10-17T11:13:40.000000Z',
          color: '#008000',
        },
        {
          id: 6,
          name: 'Одежда и обувь',
          slug: 'clothes',
          is_income: 0,
          created_at: '2021-04-07T11:05:37.000000Z',
          updated_at: '2021-10-17T11:13:46.000000Z',
          color: '#800000',
        },
        {
          id: 7,
          name: 'Для дома',
          slug: 'furniture',
          is_income: 0,
          created_at: '2021-04-07T11:05:37.000000Z',
          updated_at: '2021-10-17T11:13:54.000000Z',
          color: '#8000ff',
        },
        {
          id: 8,
          name: 'Красота и здоровье',
          slug: 'health',
          is_income: 0,
          created_at: '2021-04-07T11:05:37.000000Z',
          updated_at: '2021-10-17T11:19:35.000000Z',
          color: '#ff8040',
        },
        {
          id: 9,
          name: 'Развлечения',
          slug: 'entertainment',
          is_income: 0,
          created_at: '2021-04-07T11:05:37.000000Z',
          updated_at: '2021-10-17T11:19:46.000000Z',
          color: '#f24309',
        },
        {
          id: 10,
          name: 'Подарки',
          slug: 'gifts',
          is_income: 0,
          created_at: '2021-04-07T11:05:37.000000Z',
          updated_at: '2021-10-17T11:20:01.000000Z',
          color: '#00ffff',
        },
        {
          id: 11,
          name: 'Аренда',
          slug: 'rent',
          is_income: 0,
          created_at: '2021-04-07T11:05:37.000000Z',
          updated_at: '2021-10-17T11:20:09.000000Z',
          color: '#808080',
        },
        {
          id: 12,
          name: 'Коммуналка',
          slug: 'utility',
          is_income: 0,
          created_at: '2021-04-07T11:05:37.000000Z',
          updated_at: '2022-03-12T10:45:41.000000Z',
          color: '#c0c0c0',
        },
        {
          id: 13,
          name: 'Разное',
          slug: 'misc',
          is_income: 0,
          created_at: '2021-04-07T11:05:37.000000Z',
          updated_at: '2022-03-12T10:21:36.000000Z',
          color: '#ffff00',
        },
        {
          id: 14,
          name: 'Общие доходы',
          slug: 'misc_incomes',
          is_income: 1,
          created_at: '2021-04-07T11:05:37.000000Z',
          updated_at: '2021-10-17T11:20:30.000000Z',
          color: '#00ff40',
        },
      ],
    }
  },
}
</script>

<style lang="scss" scoped>
.card-widget {
  ::v-deep {
    .card {
      padding-left: 1rem;
      padding-right: 1rem;
      color: var(--on-surface);
      background-color: var(--surface);
    }
  }
}
</style>
