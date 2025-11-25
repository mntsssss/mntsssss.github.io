let selectedPeg = null
let moveCount = 0
let isWin = false

const kernels = document.querySelectorAll('.kernel')

kernels.forEach(kernel => {
    kernel.addEventListener('click', handleKernelClick)
})

function handleKernelClick(event) {
    const clickedKernel = event.currentTarget;
    
    if (!selectedPeg) {
        if (clickedKernel.children.length > 0) {
            selectedPeg = clickedKernel
            selectedPeg.style.backgroundColor = 'white'
        }
    } 
    else {
        if (canMove(selectedPeg, clickedKernel)) {
            moveRing(selectedPeg, clickedKernel)
            moveCount++
            console.log('Ход:', moveCount)
            checkWin()
        } 
        else {
            console.log('большее на меньшее')
        }
        
        selectedPeg.style.backgroundColor = 'black'
        selectedPeg = null;
    }
}


function canMove(fromKernel, toKernel) {
    if (toKernel.children.length == 0 && !isWin) return true
    const fromRing = fromKernel.lastElementChild
    const toRing = toKernel.lastElementChild

    
    const fromNumber = getRingNumber(fromRing.className)
    const toNumber = getRingNumber(toRing.className)
    return fromNumber > toNumber;
}

function getRingNumber(className) {
    const lastChar = className.slice(-1)
    return parseInt(lastChar)
}

function moveRing(fromKernel, toKernel) {
    const ringToMove = fromKernel.lastElementChild
    toKernel.appendChild(ringToMove)
    updateRingPositions(toKernel)
}

function updateRingPositions(kernel) {
    const rings = kernel.querySelectorAll('.ring')
    rings.forEach((ring, index) => {
        ring.style.bottom = (index * 30) + 'px'
    });
}

function checkWin() {
    const kernel2 = document.getElementById('kernel2')
    const kernel3 = document.getElementById('kernel3')
    const message = document.getElementById('message')
    
    if (kernel2.children.length === 5 || kernel3.children.length === 5) {
            isWin = true
            alert(`Победа! Вы собрали башню за ${moveCount} ходов!`)
            message.textContent=(`Победа! Вы собрали башню за ${moveCount} ходов!`)

        
    }
}