        //access to the button
        const evilButton = document.getElementById("untouchable")
        const OFFSET = 20;

        //event listener to when you manage to click the button
        evilButton.addEventListener('click', () => {
            alert("Nice Try!")
            window.close()
        })

        //event to know x,y loc of the mouse
        document.addEventListener('mousemove', (e) => {
            const x = e.pageX
            const y = e.pageY
            const buttonBox = evilButton.getBoundingClientRect()
            const horizentalDistanceFromCenter = distanceFromCenter(buttonBox.x, x, buttonBox.width)
            const verticalDistanceFromCenter = distanceFromCenter(buttonBox.y, y, buttonBox.height)

            //when should the button start moving, once the mouse is how close to the button
            const horizentalOffset = buttonBox.width / 2 + OFFSET
            const verticalOffset = buttonBox.height / 2 + OFFSET

            if (Math.abs(horizentalDistanceFromCenter) <= horizentalOffset && Math.abs(verticalDistanceFromCenter) <= verticalOffset) {
                setButtonPosition(
                    buttonBox.x + horizentalOffset / horizentalDistanceFromCenter * 10,
                    buttonBox.y + verticalOffset / verticalDistanceFromCenter * 10
                )
            }
        })
        
        //function to know the mouse distance from the center of the button
        function distanceFromCenter(boxPosition, mousePosition, boxSize) {
            return boxPosition - mousePosition + boxSize / 2;
        }

        //function to set the new button location
        function setButtonPosition(left, top) {
            const windowBox = document.body.getBoundingClientRect()
            const buttonBox = evilButton.getBoundingClientRect()

            if (distanceFromCenter(left, windowBox.left, buttonBox.width) < 0) {
                left = windowBox.right - buttonBox.width - OFFSET
            }
            if (distanceFromCenter(left, windowBox.right, buttonBox.width) > 0) {
                left = windowBox.left + OFFSET
            }
            if (distanceFromCenter(top, windowBox.top, buttonBox.height) < 0) {
                top = windowBox.bottom - buttonBox.height - OFFSET
            }
            if (distanceFromCenter(top, windowBox.bottom, buttonBox.height) > 0) {
                top = windowBox.top + OFFSET
            }

            evilButton.style.left = `${left}px`
            evilButton.style.top = `${top}px`
        }
