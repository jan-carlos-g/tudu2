import React, { useCallback, useEffect, useRef, useState } from "react";
import { Button, Text, View, StatusBar, TextInput, StyleSheet, Keyboard, ScrollView, ActivityIndicator, FlatList, RefreshControl } from "react-native";
import api from "../../services/api";


interface TuduProps {
    id: string
    textTudu: string
}
export const Home: React.FC = () => {
    const [textTudu, setTextTudu] = useState('');
    const [Tudus, setTudus] = useState<TuduProps[]>([])
    const inputRef = useRef<TextInput>(null)
    const onPress = useCallback(async () => {
        Keyboard.dismiss();
        Keyboard.emit;
        await api.post('/tudus', { textTudu })

        findTudus()

    }, [textTudu, Tudus])

    const onChangeTudu = useCallback((newTudu) => setTextTudu(newTudu), [])
    const [loading, setLoading] = useState(true)
    const findTudus = useCallback(async () => {
        setLoading(true)
        const data = await api.get('/tudus')
        setLoading(false)
        setTudus(data.data.result)
        inputRef.current?.clear()
    }, [inputRef])

    useEffect(() => {

        // const findTudus = () => {
        //     api.get('/tudus').then((data) => {
        //         const data2 = data
        //         console.log({ data: data2 })
        //     })
        //     console.log('Linha debaixo')
        // }

        findTudus()
    }, [])

    return (
        <View style={styles.container}>
            <StatusBar barStyle='dark-content' backgroundColor='#6074C1' />
            <View style={styles.newTudu}>
                <Text style={styles.subTitle}>New Tudu</Text>
                <TextInput placeholderTextColor={"#DDDDDD"} ref={inputRef} placeholder="Type your tudu" returnKeyType='send' style={styles.input} onChangeText={onChangeTudu} />
                <View style={styles.button}>
                    <Button color="#4E66CC" title=" CREATE " onPress={onPress} disabled={loading} />
                </View>
            </View>
            {
                loading === true &&
                <ActivityIndicator size={60} color='#E0FFFF' style={styles.loading} />
            }
            {
                loading === false &&
                <View style={{ width: "100%", flex: 1, marginBottom: 10 }}>
                    {
                        // Tudus.map((Tudu, index) => (
                        //     <View key={Tudu.id} style={styles.tudus}>
                        //         <Text style={{ fontSize: 16 }}>{Tudu.textTudu}</Text>
                        //     </View>
                        // ))
                        <FlatList
                            refreshControl={<RefreshControl refreshing={false} colors={["red"]} enabled={!loading} onRefresh={findTudus} />}
                            contentContainerStyle={{ alignItems: "center" }}
                            data={Tudus}
                            keyExtractor={item => String(item.id)}
                            renderItem={({ item }) => <ListItem index={item.id} item={item.textTudu} />}
                        />
                    }
                </View>
            }
        </View>
    )
}

interface ListItemProps {
    index: string
    item: string
}

const ListItem: React.FC<ListItemProps> = ({ item }) => {
    return (
        <View style={styles.tudus}>
            <Text style={{ fontSize: 16, alignSelf: 'baseline', marginLeft: 50 }}>{item}</Text>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#6074C1',
        flexDirection: 'column',
        flex: 1,
    },
    newTudu: {
        marginTop: 19
    },
    areaTudus: {
        flex: 1,
        marginTop: 10,
        flexDirection: 'column'
    },
    tudus: {
        backgroundColor: '#E0FFFF',
        alignItems: 'center',
        marginTop: 5,
        padding: 20,
        minWidth: "80%",
        borderRadius: 10
    },
    subTitle: {
        textAlign: "center",
        fontSize: 35,
        color: '#E0FFFF'
    },
    input: {
        borderWidth: 1,
        borderColor: '#DFE3F3',
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: "center",
        color: "#FFF",
        fontSize: 22,
        margin: 10,
        padding: 5,
        paddingLeft: 10
    },
    button: {
        width: 100,
        height: 40,
        marginTop: 10,
        alignSelf: 'center'
    },
    loading: {
        color: '#E0FFFF',
        flexDirection: 'column',
        marginTop: 20,

    }
});

