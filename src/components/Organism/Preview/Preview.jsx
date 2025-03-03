import {
  Stack,
  Image,
  Flex,
  Text,
  Box,
  Spacer,
  Grid,
  GridItem,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from '@chakra-ui/react';
import { useContext } from 'react';

import { InvoiceContext } from '../../../core/InvoiceContext';

export default function Preview() {
  const { invoice, items, image, imageSize, signature, signatureSize } =
    useContext(InvoiceContext);

  const subTotal = items.reduce((acc, item) => acc + item.itemTotal, 0);

  const tax = (subTotal * invoice.tax) / 100;
  const total = subTotal + tax;
  return (
    <>
      <Stack
      // bg={useColorModeValue('#fff', '#1A202C')}
      // color={useColorModeValue('gray.800', 'gray.200')}
      >
        <Stack spacing={10}>
          <Flex>
            <Box>
              {image && (
                <Image
                  src={image}
                  alt="company logo"
                  className="company-logo"
                  style={{
                    borderRadius: '10px',
                    marginBottom: '10px',
                  }}
                  w={imageSize}
                  h={imageSize}
                />
              )}
            </Box>
            <Spacer />
            <Box spacing={3}>
              <Text fontSize="6xl" align="end">
                Invoice
              </Text>
              <Text fontSize="2xl" align="end">
                {invoice.yourCompany}
              </Text>
              <Text align="end">{invoice.yourName}</Text>
              <Text align="end">{invoice.yourAddress}</Text>
              <Text align="end">{invoice.yourCity}</Text>
              <Text align="end">{invoice.yourWebsite}</Text>
            </Box>
          </Flex>
        </Stack>
        {/* Client Data  */}
        <Stack my={15} spacing={10}>
          <Flex>
            <Box spacing={3} mt={10}>
              <Text as="h3" fontWeight={'bold'} align="start">
                Bill To :{' '}
              </Text>
              <Text fontSize="2xl">{invoice.clientName}</Text>
              <Text>{invoice.clientAddress}</Text>
              <Text>{invoice.clientCity}</Text>
              <Text>{invoice.clientWebsite}</Text>
            </Box>

            <Spacer />

            <Box mt={10}>
              <Grid templateColumns="repeat(3, 1fr)" gap={4}>
                <GridItem colSpan={2} h="10">
                  <Text fontWeight={'bold'} align="start">
                    Invoice No :{' '}
                  </Text>{' '}
                  <Text fontWeight={'bold'} align="start">
                    Invoice Date :{' '}
                  </Text>{' '}
                  <Text fontWeight={'bold'} align="start">
                    Invoice Due-Date :{' '}
                  </Text>
                </GridItem>
                <GridItem colStart={4} colEnd={6} h="10">
                  <Text align="end">{invoice.invoiceNumber}</Text>
                  <Text align="end">{invoice.invoiceDate}</Text>
                  <Text align="end">{invoice.dueDate}</Text>
                </GridItem>
              </Grid>
            </Box>
          </Flex>
        </Stack>
        {/* Invoice Table */}

        <TableContainer>
          <Table mt={10}>
            <Thead>
              <Tr>
                <Th>Item</Th>
                <Th>Quantity</Th>
                <Th>Price</Th>
                <Th isNumeric>Amount</Th>
              </Tr>
            </Thead>
            <Tbody>
              {items.map((item, index) => (
                <Tr key={index}>
                  <Td>{item.itemName}</Td>
                  <Td>{item.itemQuantity}</Td>
                  <Td>₹ {item.itemPrice}</Td>
                  <Td isNumeric> ₹ {item.itemTotal}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
        <Flex>
          <Spacer />
          <Box align="end" pt={5} spacing={10}>
            <Grid templateColumns="repeat(3, 1fr)" gap={4}>
              <GridItem colSpan={2} h="10">
                <Text fontWeight={'bold'} align="start">
                  Sub Total :{' '}
                </Text>{' '}
                <Text fontWeight={'bold'} align="start">
                  Tax :{' '}
                </Text>{' '}
                <Text fontWeight={'bold'} align="start">
                  Total :{' '}
                </Text>
              </GridItem>
              <GridItem colStart={4} colEnd={6} h="10">
                <Text align="end">{subTotal ? `₹ ${subTotal}` : '-'}</Text>
                <Text align="end">{tax ? tax + '%' : 0}</Text>
                <Text align="end">{total ? `₹ ${total}` : '-'}</Text>
              </GridItem>
            </Grid>
          </Box>
        </Flex>
      </Stack>
      <Stack mt={8} spacing={3}>
        {invoice.notes.noteToggle ? null : (
          <Box>
            <Text as="h3" fontWeight={'bold'} align="start">
              Notes :
            </Text>
            <Text>{invoice.notes.note}</Text>
          </Box>
        )}
      </Stack>{' '}
      <Stack mt={8} spacing={3}>
        {invoice.terms.termToggle ? null : (
          <Box>
            <Text as="h3" fontWeight={'bold'} align="start">
              Terms & Condition
            </Text>
            <Text>{invoice.terms.term}</Text>
          </Box>
        )}
      </Stack>
      <Stack
        mt={{
          base: '20px',
          md: '20px',
        }}
        spacing={3}
      >
        <Flex justifyContent={'flex-end'}>
          {invoice.yourCompany && (
            <Box
              className="stamp is-nope"
              borderWidth="0.5rem"
              borderStyle="double"
              borderRadius="10px"
              color={invoice.sealColor}
              borderColor={invoice.sealColor}
            >
              {invoice.yourCompany} <br /> RN:
              {invoice.yourRegistrationNumber}
            </Box>
          )}
        </Flex>
        {signature && (
          <Flex justifyContent={'flex-end'}>
            <Image
              className="signature"
              src={signature}
              alt="signature"
              width={signatureSize}
              height={signatureSize}
            />
          </Flex>
        )}
        <Box>
          <Text align="end" fontWeight={'500'}>
            {invoice.yourName}
          </Text>
          <Text align="end" fontWeight={'500'}>
            {invoice.invoiceDate}
          </Text>
        </Box>
      </Stack>
    </>
  );
}
