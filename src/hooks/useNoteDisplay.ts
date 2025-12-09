import { useSettingsStore } from '../stores/settingsStore';
import { getDisplayNote } from '../utils/noteDisplay';
import type { Note } from '../types/scales';

export function useNoteDisplay() {
  const notation = useSettingsStore((state) => state.noteNotation);
  return (note: Note) => getDisplayNote(note, notation);
}
