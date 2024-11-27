import React from "react"

const Search = ({
  searchTerm,
  handleChangeSearchTerm,
}: {
  searchTerm: string
  handleChangeSearchTerm: (event: React.ChangeEvent<HTMLInputElement>) => void
}) => {
  return (
    <div>
      <label className="content-label block" htmlFor="blogs-search">
        搜索
      </label>
      <input
        type="search"
        id="blogs-search"
        autoComplete="off"
        placeholder="搜索标题"
        value={searchTerm}
        onChange={handleChangeSearchTerm}
      />
    </div>
  )
}

export default Search
