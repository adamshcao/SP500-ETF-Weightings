import {
  Box,
  Heading,
  Text,
  SimpleGrid,
  Container,
} from "@chakra-ui/react";

import {Tooltip as CoolTooltip} from "@chakra-ui/react";
import React from 'react';
import { useEffect, useState } from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const ETFWeight = () => {

  const [data, setData] = useState([] as any[])
  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    fetch('api/etffmp') //This is the API file.
      .then((res) => res.json())
      .then((data) => {
        setData(data)
        setLoading(false)
      })
  }, [])

  const labels : string[] = [];
  const values : number[] = [];

  const graphdata = {
    labels: labels,
    datasets: [
      {
        label: 'Sector',
        data: values,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(153, 57, 85, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(191, 255, 188, 0.2)',
          'rgba(101, 116, 58, 0.2)',
          'rgba(45, 194, 189, 0.2)',
          'rgba(122, 130, 171, 0.2)',
          'rgba(1, 22, 56, 0.2)',
          'rgba(66, 242, 247, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(153, 57, 85, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(191, 255, 188, 1)',
          'rgba(101, 116, 58, 1)',
          'rgba(45, 194, 189, 1)',
          'rgba(122, 130, 171, 1)',
          'rgba(1, 22, 56, 1)',
          'rgba(66, 242, 247, 1)'
        ],
      },
    ],
  };
  
  if (!(data == null)) {
    for (let i = 0; i < data.length; i++) {
      var obj = {
        label: data[i].sector,
        value: Number(data[i].weightPercentage.toString().replace(/%/g, ''))
      }
      labels.push(data[i].sector)
      values.push(Number(data[i].weightPercentage.toString().replace(/%/g, '')))
    }
  }

  function getRandomColor() {
    const colors = [];
    const length = 11;
    for(let j=0; j<length; j++ ){
        var letters = 'ABCDEF01'.split('');
        let color = '#';
        for (let i = 0; i < 6; i++ ) {
          color += letters[Math.floor(Math.random() * letters.length)];
        }
        colors.push(color);
    }
    return colors;
  }

  return (
    <>
    <></>
      <Heading paddingTop={16} paddingBottom={16} as="h2" fontSize={{base: '3xl', md: '5xl'}} textAlign={"center"}>
        <CoolTooltip placement="top-end" label="Live Data!">S&P500 ETF Sector Weightings</CoolTooltip>
      </Heading>
      <SimpleGrid columns={{base: 1, md: 2}} spacing={24} alignItems={"center"}>
        <Box maxWidth={{base: '100%', md: '100%'}} fontWeight={"light"}>
          <Text fontWeight={"normal"} fontSize={'xl'}>S&P 500 - The Standard and Poor's 500</Text>  
          <Text>A U.S Stock index that tracks the 500 biggest companies listed on the U.S stock markets.</Text>
          <br/>
          <Text>Weighting percentages are based on real time data.</Text>
        </Box>
        <Container maxWidth={{base: '100%', md: '100%'}} >
          <Doughnut data={graphdata} />
        </Container>
      </SimpleGrid>
    </>
  );
};

export default ETFWeight;

