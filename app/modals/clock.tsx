import { StyleSheet, View, TouchableOpacity, Text as RNText } from 'react-native'
import React, { useState } from 'react'
import Svg, { Circle, G, Text } from 'react-native-svg'

const Clock = () => {
  const [selectedAngle, setSelectedAngle] = useState<number | null>(null)

  const angles = Array.from({ length: 12 }, (_, i) => i * 30)

  const drawCircle = (Cx:number, Cy:number, angle:number) => {
    const radian = angle * (Math.PI / 180)

    const x =
      (Cx - 150) * Math.cos(radian) -
      (Cy - 150) * Math.sin(radian) +
      150

    const y =
      (Cx - 150) * Math.sin(radian) +
      (Cy - 150) * Math.cos(radian) +
      150

    const isSelected = selectedAngle === angle

    return (
      <G key={angle}>
        <Circle
          cx={x}
          cy={y}
          r={isSelected ? 15 : 10}
          fill={isSelected ? 'blue' : 'red'}
          onPress={() => setSelectedAngle(angle)}
        />
        <Text
          x={x - 5}
          y={y + 5}
          fontSize="12"
          fill="black"
        >
          {angle / 30 === 0 ? 12 : angle / 30}
        </Text>
      </G>
    )
  }

  return (
    <View>
      <Svg height="300" width="300" style={{ backgroundColor: 'white' }}>
        <Circle cx="150" cy="150" r="100" fill="lightgrey" />
        <Circle cx="150" cy="150" r="5" fill="blue" />

        {angles.map(angle => drawCircle(150, 60, angle))}
      </Svg>

      <TouchableOpacity
        style={styles.okButton}
        onPress={() => console.log('Selected:', selectedAngle)}
      >
        <RNText style={{ color: 'white', fontWeight: 'bold' }} onPress={()=>console.log('hry')
        }>OK</RNText>
      </TouchableOpacity>
    </View>
  )
}

export default Clock

const styles = StyleSheet.create({
  okButton: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginLeft: -15,
    marginTop: -15,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
  },
})
