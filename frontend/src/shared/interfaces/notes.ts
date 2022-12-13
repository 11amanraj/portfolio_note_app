export interface note {
    id: number,
    tags: string[],
    title: string,
    body: string
  }
  
export interface notebook {
    [key: string]: note[]
}
