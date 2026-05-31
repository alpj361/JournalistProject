/**
 * VIZTA V4.3: Active Learning System
 *
 * Automatically detects, researches, and learns unknown terms, concepts,
 * and contextual information to build an intelligent knowledge base.
 *
 * Features:
 * - Detects unknown terms in user queries
 * - Researches terms using Perplexity API
 * - Extracts structured knowledge with OpenAI
 * - Saves to vizta_learned_items table
 * - Supports political, social, economic, cultural, and technical contexts
 */

const { OpenAI } = require('openai');
const { createClient } = require('@supabase/supabase-js');
const fetch = require('node-fetch');

const openai = new OpenAI({ apiKey: process.env.EXPO_PUBLIC_VIBECODE_OPENAI_API_KEY });
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

class ActiveLearning {
  /**
   * STEP 1: Detect Unknown Terms in User Query
   * Uses OpenAI to identify terms that might need learning
   *
   * @param {string} userMessage - User's query
   * @param {string} userId - User ID
   * @returns {Promise<Array>} - Array of unknown terms with metadata
   */
  async detectUnknownTerms(userMessage, userId) {
    try {
      console.log('[ACTIVE_LEARNING] Detecting unknown terms in query...');

      const response = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [{
          role: 'system',
          content: `Identifica términos, conceptos, nombres de personas, organizaciones,
                    eventos o fenómenos que podrían requerir contexto adicional para
                    responder de manera informada.

                    Considera:
                    - Términos políticos (reformas, partidos, candidatos)
                    - Contexto social (movimientos, protestas, tendencias)
                    - Conceptos económicos (indicadores, empresas, mercados)
                    - Términos culturales (eventos, personalidades)
                    - Tecnicismos específicos

                    Devuelve JSON:
                    {
                      "unknown_terms": [
                        {
                          "term": "nombre del término",
                          "category": "political|social|economic|cultural|technical",
                          "confidence": 0.0-1.0,
                          "reason": "por qué necesita contexto"
                        }
                      ]
                    }

                    Si no hay términos desconocidos, devuelve: {"unknown_terms": []}`
        }, {
          role: 'user',
          content: userMessage
        }],
        response_format: { type: 'json_object' },
        temperature: 0.3
      });

      const parsed = JSON.parse(response.choices[0].message.content);
      const unknown_terms = parsed.unknown_terms || [];

      if (unknown_terms.length === 0) {
        console.log('[ACTIVE_LEARNING] No unknown terms detected');
        return [];
      }

      console.log(`[ACTIVE_LEARNING] Found ${unknown_terms.length} potential terms:`,
        unknown_terms.map(t => t.term).join(', '));

      // Check which terms we already know
      const unknownTerms = [];
      for (const term of unknown_terms) {
        const exists = await this._checkIfTermExists(term.term, userId);
        if (!exists) {
          unknownTerms.push(term);
        } else {
          console.log(`[ACTIVE_LEARNING] Term already known: ${term.term}`);
        }
      }

      console.log(`[ACTIVE_LEARNING] ${unknownTerms.length} truly unknown terms to learn`);
      return unknownTerms;

    } catch (error) {
      console.error('[ACTIVE_LEARNING] Error detecting unknown terms:', error);
      return [];
    }
  }

  /**
   * STEP 2: Learn Unknown Terms
   * Researches each term and saves structured knowledge
   *
   * @param {Array} terms - Array of term objects from detectUnknownTerms
   * @param {string} userId - User ID
   * @returns {Promise<Array>} - Array of saved learned items
   */
  async learnTerms(terms, userId) {
    if (!terms || terms.length === 0) {
      return [];
    }

    console.log(`[ACTIVE_LEARNING] Starting to learn ${terms.length} terms...`);
    const learned = [];

    for (const term of terms) {
      try {
        console.log(`[ACTIVE_LEARNING] Learning: ${term.term} (${term.category})`);

        // Research the term using Perplexity
        const research = await this._researchTerm(term.term);

        if (!research || !research.content) {
          console.warn(`[ACTIVE_LEARNING] No research results for: ${term.term}`);
          continue;
        }

        // Extract structured knowledge
        const knowledge = await this._extractKnowledge(term, research);

        // Save to learned_items
        const saved = await this._saveLearnedItem({
          user_id: userId,
          knowledge_type: this._mapCategoryToKnowledgeType(term.category),
          term: term.term,
          definition: knowledge.definition,
          context: knowledge.context,
          summary: knowledge.summary,
          source_type: 'perplexity_search',
          source_url: research.source_url,
          source_title: research.source_title,
          relevance_score: term.confidence || 0.7,
          confidence_level: (term.confidence || 0.7) > 0.7 ? 'high' : 'medium',
          temporal_relevance: knowledge.temporal_context || 'current',
          related_terms: knowledge.related_terms || [],
          tags: knowledge.tags || [],
          auto_learned: true,
          verified: false
        });

        learned.push(saved);
        console.log(`[ACTIVE_LEARNING] ✅ Learned: ${term.term}`);

      } catch (error) {
        console.error(`[ACTIVE_LEARNING] Failed to learn term: ${term.term}`, error.message);
      }
    }

    console.log(`[ACTIVE_LEARNING] Successfully learned ${learned.length}/${terms.length} terms`);
    return learned;
  }

  /**
   * STEP 3: Research Term with Perplexity
   * Uses Perplexity API to get comprehensive information about a term
   *
   * @param {string} term - Term to research
   * @returns {Promise<Object>} - Research results with content and citations
   */
  async _researchTerm(term) {
    try {
      console.log(`[ACTIVE_LEARNING] Researching with Perplexity: ${term}`);

      const response = await fetch('https://api.perplexity.ai/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.PERPLEXITY_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'llama-3.1-sonar-small-128k-online',
          messages: [{
            role: 'user',
            content: `Define y explica en detalle: "${term}"

                      Incluye:
                      1. Definición clara y concisa (1-2 oraciones)
                      2. Contexto actual relevante (político, social, económico, etc.)
                      3. Eventos recientes relacionados (si aplica)
                      4. Términos relacionados
                      5. Información verificable con fuentes

                      Responde de manera objetiva y factual.`
          }],
          temperature: 0.2
        })
      });

      if (!response.ok) {
        throw new Error(`Perplexity API error: ${response.status}`);
      }

      const data = await response.json();
      const content = data.choices?.[0]?.message?.content;
      const citations = data.citations || [];

      return {
        content: content || '',
        citations: citations,
        source_url: citations[0] || null,
        source_title: this._extractTitleFromUrl(citations[0])
      };

    } catch (error) {
      console.error('[ACTIVE_LEARNING] Perplexity research error:', error.message);
      return null;
    }
  }

  /**
   * STEP 4: Extract Structured Knowledge from Research
   * Uses OpenAI to parse research results into structured format
   *
   * @param {Object} term - Term object with metadata
   * @param {Object} research - Research results from Perplexity
   * @returns {Promise<Object>} - Structured knowledge object
   */
  async _extractKnowledge(term, research) {
    try {
      console.log(`[ACTIVE_LEARNING] Extracting structured knowledge for: ${term.term}`);

      const response = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [{
          role: 'system',
          content: `Extrae conocimiento estructurado del siguiente texto de investigación.

                    Devuelve JSON:
                    {
                      "definition": "definición corta y clara (1-2 oraciones)",
                      "context": "contexto detallado y relevante (2-3 párrafos)",
                      "summary": "resumen ejecutivo (1 párrafo corto)",
                      "related_terms": ["término1", "término2", "término3"],
                      "tags": ["tag1", "tag2", "tag3"],
                      "temporal_context": "breaking|recent|current|historical|evergreen"
                    }

                    Para temporal_context:
                    - breaking: información de últimas 24h
                    - recent: última semana
                    - current: último mes
                    - historical: eventos pasados
                    - evergreen: información atemporal`
        }, {
          role: 'user',
          content: `Término: ${term.term}
                    Categoría: ${term.category}

                    Investigación:
                    ${research.content}`
        }],
        response_format: { type: 'json_object' },
        temperature: 0.2
      });

      const knowledge = JSON.parse(response.choices[0].message.content);
      console.log(`[ACTIVE_LEARNING] Extracted knowledge structure for: ${term.term}`);

      return knowledge;

    } catch (error) {
      console.error('[ACTIVE_LEARNING] Knowledge extraction error:', error.message);

      // Fallback to basic structure
      return {
        definition: research.content.substring(0, 200),
        context: research.content.substring(0, 500),
        summary: research.content.substring(0, 150),
        related_terms: [],
        tags: [term.category],
        temporal_context: 'current'
      };
    }
  }

  /**
   * STEP 5: Save Learned Item to Database
   *
   * @param {Object} item - Learned item data
   * @returns {Promise<Object>} - Saved item from database
   */
  async _saveLearnedItem(item) {
    try {
      const { data, error } = await supabase
        .from('vizta_learned_items')
        .insert(item)
        .select()
        .single();

      if (error) throw error;

      console.log(`[ACTIVE_LEARNING] ✅ Saved learned item: ${item.term} [${item.knowledge_type}]`);
      return data;

    } catch (error) {
      console.error(`[ACTIVE_LEARNING] Database save error for: ${item.term}`, error.message);
      throw error;
    }
  }

  /**
   * Helper: Check if term already exists in learned items
   */
  async _checkIfTermExists(term, userId) {
    try {
      const { data, error } = await supabase
        .from('vizta_learned_items')
        .select('id')
        .eq('user_id', userId)
        .ilike('term', term)
        .limit(1);

      if (error) throw error;
      return data && data.length > 0;

    } catch (error) {
      console.error('[ACTIVE_LEARNING] Term existence check error:', error.message);
      return false; // Assume doesn't exist on error
    }
  }

  /**
   * Helper: Map category to knowledge_type enum
   */
  _mapCategoryToKnowledgeType(category) {
    const mapping = {
      political: 'political_context',
      social: 'social_context',
      economic: 'economic_context',
      cultural: 'cultural_context',
      technical: 'technical_term'
    };
    return mapping[category] || 'concept_definition';
  }

  /**
   * Helper: Extract title from URL
   */
  _extractTitleFromUrl(url) {
    if (!url) return null;
    try {
      const urlObj = new URL(url);
      return urlObj.hostname.replace('www.', '');
    } catch {
      return url;
    }
  }
}

// Export singleton instance
module.exports = new ActiveLearning();
