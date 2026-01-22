import { mapOrder } from "~/utils/mapOrder"

const columns = [
  { id: 'col-3', title: 'Done' },
  { id: 'col-1', title: 'To Do' },
  { id: 'col-2', title: 'In Progress' }
]

describe('Test function maporders: ', () => {
  it('Should return [] if originalArray is null', () => {
    expect(mapOrder(null as any, [1, 2, 3, 4], 'id')).toEqual([])
  })
  it('Should return [] if columnOrder  is null', () => {
    expect(mapOrder([1, 2, 3], null as any, 'id')).toEqual([])
  })
  it('Should return [] if originalArray is null', () => {
    expect(mapOrder([1, 2, 3], null as any, 'id')).toEqual([])
  })
  it('Should return [] if id is null', () => {
    expect(mapOrder([1, 2, 3], [1, 2, 3], '')).toEqual([])
  })
  it('Should result array result: ', () => {

    const result = [
      { id: 'col-1', title: 'To Do' },
      { id: 'col-2', title: 'In Progress' },
      { id: 'col-3', title: 'Done' }
    ]

    const columnOrder = ['col-1', 'col-2', 'col-3']
    expect(mapOrder(columns, columnOrder, 'id')).toEqual(result)
  })
  it('Should push items not in orderArray to the end', () => {
    const columnOrder = ['col-2', 'col-1']
    const result = [
      { id: 'col-2', title: 'In Progress' },
      { id: 'col-1', title: 'To Do' },
      { id: 'col-3', title: 'Done' }
    ]
    expect((mapOrder(columns, columnOrder, 'id'))).toEqual(result)
  })

  it('Should push items not in orderArray to the end', () => {
    const columnOrder: number[] = []

    const result = mapOrder(columns, columnOrder, 'id')
    expect(result.map(item => item.id)).toEqual(['col-3', 'col-1', 'col-2'])
  })
  it('Should work with customer', () => {
    const columnOrder = ['In Progress', 'To Do', 'Done']

    // const result = mapOrder(columns, columnOrder, 'id')
    const result = mapOrder(columns, columnOrder, 'title')
    expect(result.map(item => item.title)).toEqual(['In Progress', 'To Do', 'Done'])
  })
})