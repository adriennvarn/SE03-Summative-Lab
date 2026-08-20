const API_URL = "https://freedictionaryapi.com/api/v1/entries/en/"


// Element references that aren't changed

const wordElement = document.getElementById("word")
const phoneticElement = document.getElementById("phonetic")
const audioContainer = document.querySelector("audio")
const meaningsContainer = document.getElementById("meanings")

async function fetchDefinition(word) {
    // Fetch and parse data
    try {
        resetData()
        const result = await fetch(API_URL + word)
        // const result = await fetch(API_URL + word)
        const data = await result.json()
        addData(data)
    } catch (err) {
        console.error("Fetch error:", err)
    }
}

function resetData() {
    // Clear word, phonetic
    wordElement.textContent = ""
    phoneticElement.textContent = ""

    // Clear sources and hide player
    audioContainer.innerHTML = ""
    audioContainer.classList.add("hidden")

    // Just kill the whole meanings div
    meaningsContainer.innerHTML = ""
}

function addData(data) {
    // Fill in word
    wordElement.textContent = data.word

    // Fill in phonetics and audio
    phoneticElement.textContent = data.entries[0].pronunciations[0].text


    // ***** AUDIO is not available in the API I'm using. Will update if audio API is found.
    // ***** In the meantime, code below demonstrates understanding.
    
    // const audioSource = document.createElement("source")
    // audioSource.setAttribute("src", data.phonetics[0].sourceUrl)
    // audioSource.setAttribute("type", "audio/ogg")
    // audioContainer.append(audioSource)
    // audioContainer.classList.remove("hidden")

    // For each part of speech...
    for (const entry of data.entries) {
        // Set part of speech text
        const pos = document.createElement("h5")
        let posText = entry.partOfSpeech
        posText = posText[0].toUpperCase() + posText.slice(1)
        pos.textContent = posText
        meaningsContainer.append(pos)

        // ... and make list of definitions
        const definitionList = document.createElement("ul")

        for (const definition of entry.senses) {
            const def = document.createElement("li")
            def.textContent = definition.definition
            definitionList.appendChild(def)

            // Check that example is provided at all
            if (definition.examples[0]) {
                const example = document.createElement("li")
                example.textContent = definition.examples[0]
                definitionList.appendChild(example)
            }

            definitionList.append(document.createElement("br"))
        }

        // Append full definition list to meanings section
        meaningsContainer.append(definitionList, document.createElement("hr"))
    }
}

fetchDefinition("goodbye")

module.exports = {

}