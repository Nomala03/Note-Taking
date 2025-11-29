import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Note } from '../types';


export default function NoteItem({ note, onEdit, onDelete }: { note: Note; onEdit: () => void; onDelete: () => void }) {
return (
<TouchableOpacity onPress={onEdit} style={{borderWidth:1,padding:12,borderRadius:8,marginVertical:8}}>
<View style={{flexDirection:'row',justifyContent:'space-between'}}>
<Text style={{fontWeight:'bold'}}>{note.title}</Text>
<Text>{new Date(note.updatedAt || note.createdAt).toLocaleString()}</Text>
</View>
<Text numberOfLines={2} style={{marginTop:8}}>{note.body}</Text>
<View style={{height:8}} />
<TouchableOpacity onPress={onDelete}><Text style={{color:'red'}}>Delete</Text></TouchableOpacity>
</TouchableOpacity>
);
}