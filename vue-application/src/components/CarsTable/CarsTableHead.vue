<template>
  <thead>
    <tr>
      <th>
        <select id="producer-filter">
          <option value="asc">sort order</option>
          <option value="asc">ascending</option>
          <option value="desc">descending</option>
        </select>
      </th>
      <th>
        <select id="model-filter">
          <option value="asc">sort order</option>
          <option value="asc">ascending</option>
          <option value="desc">descending</option>
        </select>
      </th>
      <th>
        <select id="body-type-filter">
          <option value="asc">sort order</option>
          <option value="asc">ascending</option>
          <option value="desc">descending</option>
        </select>
      </th>
      <th>
        <select id="year-filter">
          <option value="asc">sort order</option>
          <option value="asc">ascending</option>
          <option value="desc">descending</option>
        </select>
      </th>
      <th>
        <select id="mileage-filter">
          <option value="asc">sort order</option>
          <option value="asc">ascending</option>
          <option value="desc">descending</option>
        </select>
      </th>
      <th>
        <select id="description-filter">
          <option value="asc">sort order</option>
          <option value="asc">ascending</option>
          <option value="desc">descending</option>
        </select>
      </th>
      <th>
        <select id="created-filter">
          <option value="asc">sort order</option>
          <option value="asc">ascending</option>
          <option value="desc">descending</option>
        </select>
      </th>
      <th>
        <select id="updated-filter">
          <option value="asc">sort order</option>
          <option value="asc">ascending</option>
          <option value="desc">descending</option>
        </select>
      </th>
    </tr>
    <tr class="table-titles">
      <th>Producer</th>
      <th>Model</th>
      <th>Body type</th>
      <th>Year</th>
      <th>Mileage</th>
      <th>Description</th>
      <th>Created</th>
      <th>Updated</th>
    </tr>
  </thead>
</template>

<script>
export default {};
</script>

<style scoped>
.table-titles th {
  font-weight: bold;
}
</style>
