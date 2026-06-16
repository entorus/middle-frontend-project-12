import filter from 'leo-profanity'


filter.loadDictionary('en')
const englishWords = filter.list()
filter.loadDictionary('ru')
const russianWords = filter.list()
filter.clearList()
filter.add(englishWords)
filter.add(russianWords)
export default filter