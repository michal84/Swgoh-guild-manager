import React from 'react'

import { WithContext as ReactTags } from 'react-tag-input'
import Tag from './Tag'
import TagLabel from './TagLabel'

class Exclude extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      tags: [],
      suggestions: [],
      characters: [],
    }
    this.handleDelete = this.handleDelete.bind(this)
    this.handleAddition = this.handleAddition.bind(this)
    this.handleDrag = this.handleDrag.bind(this)
  }


  componentDidMount(props) {
    const toons = this.props.characters
    if (Object.keys(toons).length > 0) {
      const suggestions = []
      const characters = []
      Object.keys(toons).map((key) => {
        suggestions.push(toons[key].character.name)
        characters.push(toons[key].character.id)
      })

      this.setState({
        suggestions,
        characters,
      })
    }
  }

  handleDelete(i) {
    const tags = this.state.tags
    tags.splice(i, 1)
    this.setState({ tags })
  }

  handleAddition(tag) {
    console.log('additon', tag);
    const tags = this.state.tags
    tags.push({
      id: tags.length + 1,
      text: tag,
    })
    this.setState({ tags })
    console.log('addddd');
    this.props.excludeCharacters(tags);

  }

  handleDrag(tag, currPos, newPos) {
    const tags = this.state.tags

    // mutate array
    tags.splice(currPos, 1)
    tags.splice(newPos, 0, tag)

    // re-render
    this.setState({ tags })

console.log('handle Dra');
    console.log('tags', tags);
  }

  handleSuggestion = (textInputValue, possibleSuggestionsArray) =>
    possibleSuggestionsArray.filter(
      suggestion => suggestion.toLowerCase().includes(textInputValue.toLowerCase())
    )

  render() {
    const { tags, suggestions } = this.state
    return (
      <Tag>
        <TagLabel>Type character to exclude from mods:</TagLabel>
        <div className="tagsContainer">
          <ReactTags
            classNames={{
              tags: 'tags',
              tagInput: 'tagInput',
              tagInputField: 'tagInputField',
              selected: 'selected',
              tag: 'tag',
              remove: 'remove',
              suggestions: 'suggestions',
              activeSuggestion: 'activeSuggestion',
            }}
            tags={tags}
            placeholder={'Type character name'}
            suggestions={suggestions}
            handleDelete={this.handleDelete}
            handleAddition={this.handleAddition}
            handleDrag={this.handleDrag}
            handleFilterSuggestions={
              (textInputValue, possibleSuggestionsArray) =>
                this.handleSuggestion(textInputValue, possibleSuggestionsArray)
            }

          />
        </div>
      </Tag>
    )
  }

}

export default Exclude
